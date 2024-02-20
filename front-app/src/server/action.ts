"use server";

import {
  PeriodDateConstructor,
  PeriodDatePlainObj,
  QrtDate,
  QrtDatePlainObj,
  YearDate,
  YearDatePlainObj,
} from "@/store/date/customDate";
import { PrismaClient, Prisma, Company } from "@prisma/client";

import { groupData } from "./util/groupData";

import findSimilarString from "./util/findSimilarString";
import memoizee from "memoizee";
import { PeriodType } from "@/store/date/useDataOpt";
const prisma = new PrismaClient();

export const getCompanyList = memoizee(async () => {
  return prisma.company.findMany();
});

const getComanyNameList = memoizee((companyList: Company[]) =>
  companyList.map((company) => company.corp_name)
);

export const searchCompanyList = async (search: string) => {
  const companyList = await getCompanyList();
  const companyNameList = getComanyNameList(companyList);

  const searchSimilarCompany = findSimilarString(companyNameList, 12);
  const searchedCompany = searchSimilarCompany(search);

  return searchedCompany
    .map((name) => {
      const company = companyList.find((company) => company.corp_name === name);
      return company;
    })
    .filter((company): company is Company => Boolean(company));
};

export const getCompany = async (corp_code: string) => {
  const company = await prisma.company.findUnique({ where: { corp_code } });
  return company;
};

export type CompanyAccount = { account_id: string; account_name: string };

export const getCompanyAccount = async (corp_code: string) => {
  const reports = await prisma.report.findMany({
    select: { rcept_no: true },
    where: { corp_code },
  });

  const accounts = await prisma.account.findMany({
    select: { sj_name: true, account_name: true, account_id: true },
    distinct: ["account_name"],
    where: { report_rept_no: { in: reports.map((report) => report.rcept_no) } },
  });

  const pivotData = accounts.reduce((acc, account) => {
    if (!acc[account.sj_name]) {
      acc[account.sj_name] = [];
    }
    acc[account.sj_name].push({
      account_id: account.account_id,
      account_name: account.account_name,
    });
    return acc;
  }, {} as Record<string, CompanyAccount[]>);

  return Object.keys(pivotData).map((sj_name) => ({
    sj_name,
    accounts: pivotData[sj_name],
  }));
};

const getQrtAccountData = async ({
  corp_code,
  period,
  accounts,
}: {
  corp_code: string;
  period: [QrtDate, QrtDate];
  accounts: CompanyAccount[];
}): Promise<
  {
    date: QrtDatePlainObj;
    accounts: { account_name: string; account_value: number }[];
  }[]
> => {
  const data: {
    year: number;
    qrt: number;
    account_name: string;
    account_value: bigint;
  }[] = await prisma.$queryRaw`
      SELECT r.year, r.qrt, a.account_name, a.account_value
      FROM "Report" r
      JOIN "Account" a ON a.report_rept_no = r.rcept_no
      WHERE r.corp_code = ${corp_code}
        AND (r.year > ${period[0].getFullYear()} 
          OR (r.year = ${period[0].getFullYear()}
            AND r.qrt >= ${period[0].getQrt()}))
        AND (r.year < ${period[1].getFullYear()}
          OR (r.year = ${period[1].getFullYear()}
            And r.qrt <= ${period[1].getQrt()}))
        AND a.account_name IN (${Prisma.join(
          accounts.map((account) => account.account_name)
        )})
      ORDER BY r.year, r.qrt, a.account_name;`;

  const convertedNumber = data.map((item) => ({
    ...item,
    account_value: Number(item.account_value),
  }));

  const result = groupData(convertedNumber, ["year", "qrt"]).map((item) => ({
    date: item.key,
    accounts: item.data,
  })) as {
    date: QrtDatePlainObj;
    accounts: { account_name: string; account_value: number }[];
  }[];

  return result;
};

const get4QrtStackAccountData = async ({
  corp_code,
  period,
  accounts,
}: {
  corp_code: string;
  period: [QrtDate, QrtDate];
  accounts: CompanyAccount[];
}): Promise<
  {
    date: QrtDatePlainObj;
    accounts: { account_name: string; account_value: number }[];
  }[]
> => {
  const data: {
    year: number;
    qrt: number;
    account_name: string;
    account_id: string;
    account_value: bigint;
    sj_name: string;
  }[] = await prisma.$queryRaw`
      SELECT r.year, r.qrt, a.account_name, a.account_value, a.sj_name, a.account_id
      FROM "Report" r
      JOIN "Account" a ON a.report_rept_no = r.rcept_no
      WHERE r.corp_code = ${corp_code}
        AND (r.year > ${period[0].getFullYear()} 
          OR (r.year = ${period[0].getFullYear()}
            AND r.qrt >= ${period[0].getQrt()}))
        AND (r.year < ${period[1].getFullYear()}
          OR (r.year = ${period[1].getFullYear()}
            And r.qrt <= ${period[1].getQrt()}))
        AND a.account_name IN (${Prisma.join(
          accounts.map((account) => account.account_name)
        )})
      ORDER BY r.year, r.qrt, a.account_name;`;

  const convertedNumber = data.map((item) => ({
    ...item,
    account_value: Number(item.account_value),
  }));

  const timeSeriesAccounts = groupData(convertedNumber, ["year", "qrt"]).map(
    (item) => ({
      date: item.key,
      accounts: item.data,
    })
  ) as {
    date: QrtDatePlainObj;
    accounts: {
      account_name: string;
      account_value: number;
      account_id: string;
      sj_name: string;
    }[];
  }[];

  const result = timeSeriesAccounts
    .reverse()
    .reduce(
      (result, curr) => {
        const prev = result.at(-1);

        const over4Qrt =
          (prev?.date.year || 0) >= curr.date.year + 1 &&
          (prev?.date.qrt || 0) >= curr.date.qrt;

        if (!prev || over4Qrt) {
          result.push({
            ...curr,
            accounts: accounts.map((account) => ({
              account_name: account.account_name,
              account_value:
                curr.accounts.find(
                  (item) => item.account_id === account.account_id
                )?.account_value || 0,
            })),
          });
          return result;
        }

        curr.accounts
          .filter((account) => account.sj_name !== "재무상태표")
          .forEach((account) => {
            const target = prev.accounts.find(
              (inner) => inner.account_name === account.account_name
            );
            if (!target) {
              return;
            }
            target.account_value += account.account_value;
          });

        return result;
      },
      [] as {
        date: QrtDatePlainObj;
        accounts: { account_name: string; account_value: number }[];
      }[]
    )
    .map((_) => _)
    .reverse();

  return result;
};

const getYearAccountData = async ({
  corp_code,
  period,
  accounts,
}: {
  corp_code: string;
  period: [YearDate, YearDate];
  accounts: CompanyAccount[];
}): Promise<
  {
    date: YearDatePlainObj;
    accounts: { account_name: string; account_value: number }[];
  }[]
> => {
  const accumulateData: {
    year: number;
    account_name: string;
    account_value: bigint;
  }[] =
    (await prisma.$queryRaw`
  SELECT r.year, a.account_name, SUM(a.account_value) as account_value
  FROM "Report" r
  JOIN "Account" a ON a.report_rept_no = r.rcept_no
  WHERE r.corp_code = ${corp_code}
    AND r.year BETWEEN ${period[0].getFullYear()} AND ${period[1].getFullYear()}
    AND a.account_name IN (${Prisma.join(
      accounts.map((account) => account.account_name)
    )})
    AND a.sj_name <> ${"재무상태표"}
  GROUP BY r.year, a.account_name
  ORDER BY r.year, a.account_name;
`) || [];

  const stateData: {
    year: number;
    account_name: string;
    account_value: bigint;
  }[] =
    (await prisma.$queryRaw`
  SELECT r.year, a.account_name, a.account_value
  FROM "Report" r
  JOIN "Account" a ON a.report_rept_no = r.rcept_no
  WHERE r.corp_code = ${corp_code}
    AND r.year BETWEEN ${period[0].getFullYear()} AND ${period[1].getFullYear()}
    AND a.account_name IN (${Prisma.join(
      accounts.map((account) => account.account_name)
    )})
    AND r.qrt = ${4}
    AND a.sj_name = ${"재무상태표"}
  ORDER BY r.year, a.account_name;
`) || [];

  const convertedData = [...accumulateData, ...stateData]?.map((item) => ({
    ...item,
    account_value: Number(item.account_value),
  }));

  const result = groupData(convertedData, ["year"]).map((item) => ({
    date: item.key,
    accounts: item.data,
  })) as {
    date: YearDatePlainObj;
    accounts: { account_name: string; account_value: number }[];
  }[];

  return result;
};

export function getFnData(params: {
  corp_code: string;
  periodType: "year";
  period: [YearDatePlainObj, YearDatePlainObj];
  accounts: CompanyAccount[];
}): Promise<
  {
    date: PeriodDatePlainObj;
    accounts: { account_name: string; account_value: number }[];
  }[]
>;
export function getFnData(params: {
  corp_code: string;
  periodType: "qrt" | "4qrtStack";
  period: [QrtDatePlainObj, QrtDatePlainObj];
  accounts: CompanyAccount[];
}): Promise<
  {
    date: PeriodDatePlainObj;
    accounts: { account_name: string; account_value: number }[];
  }[]
>;

export async function getFnData({
  periodType,
  corp_code,
  period,
  accounts,
}: {
  periodType: PeriodType["type"];
  corp_code: string;
  period: [PeriodDatePlainObj, PeriodDatePlainObj];
  accounts: CompanyAccount[];
}): Promise<
  {
    date: PeriodDatePlainObj;
    accounts: { account_name: string; account_value: number }[];
  }[]
> {
  if (accounts.length === 0) {
    return [];
  }
  const startDate = PeriodDateConstructor(period[0]);
  const endDate = PeriodDateConstructor(period[1]);

  if (periodType === "year") {
    const period = [startDate, endDate] as [YearDate, YearDate];
    return getYearAccountData({ corp_code, period, accounts });
  }

  if ("qrt" === periodType) {
    const period = [startDate, endDate] as [QrtDate, QrtDate];

    return getQrtAccountData({
      corp_code,
      period,
      accounts,
    });
  }

  if ("4qrtStack" === periodType) {
    const period = [startDate, endDate] as [QrtDate, QrtDate];
    return get4QrtStackAccountData({ corp_code, period, accounts });
  }

  throw Error();
}
