import { YearDate, YearDatePlainObj } from "@/store/date/customDate";
import { CompanyAccount } from "../getCompanyAccount";
import prisma from "../action.const";
import { Prisma } from "@prisma/client";
import { groupData } from "../util/groupData";

export const getYearAccountData = async ({
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
