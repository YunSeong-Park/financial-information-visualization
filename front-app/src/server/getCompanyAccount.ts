"use server";
import prisma from "./action.const";

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
