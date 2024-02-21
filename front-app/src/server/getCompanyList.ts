"use server";

import memoizee from "memoizee";
import prisma from "./action.const";

export const getCompanyList = memoizee(async () => {
  return prisma.company.findMany();
});
