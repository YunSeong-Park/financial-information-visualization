import { QrtDate, QrtDatePlainObj } from "@/store/date/customDate";
import { CompanyAccount } from "../getCompanyAccount";
import prisma from "../action.const";
import { Prisma } from "@prisma/client";
import { groupData } from "../util/groupData";

export const getQrtAccountData = async ({
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
