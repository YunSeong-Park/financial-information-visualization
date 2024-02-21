import { QrtDate, QrtDatePlainObj } from "@/store/date/customDate";
import { CompanyAccount } from "../getCompanyAccount";
import prisma from "../action.const";
import { Prisma } from "@prisma/client";
import { groupData } from "../util/groupData";

export const get4QrtStackAccountData = async ({
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
