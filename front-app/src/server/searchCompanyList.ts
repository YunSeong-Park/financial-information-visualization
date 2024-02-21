"use server";

import { Company } from "@prisma/client";
import memoizee from "memoizee";
import { getCompanyList } from "./getCompanyList";
import findSimilarString from "./util/findSimilarString";

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
