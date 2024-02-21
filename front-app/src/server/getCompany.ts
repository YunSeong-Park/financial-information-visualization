"use server";

import prisma from "./action.const";

export const getCompany = async (corp_code: string) => {
  const company = await prisma.company.findUnique({ where: { corp_code } });
  return company;
};
