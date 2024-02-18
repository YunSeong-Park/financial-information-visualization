import { Company } from "../dart-business/company/company.type";
import { readLastCompanyName } from "../fileSystemService/lastCompanyName";
import { readPublicCompanyList } from "../fileSystemService/publicCompanyList";

function* getCompanyIter(startCompony?: string): IterableIterator<Company> {
  const companyList = readPublicCompanyList().filter((company) => {
    const year = Number(company.modify_date.slice(0, 4));
    return year >= 2018;
  });

  const lastCompanyName = readLastCompanyName();

  let startIndex = lastCompanyName
    ? companyList.findIndex((company) => company.corp_name === startCompony) - 1
    : -1;

  while (startIndex++ < companyList.length) {
    yield companyList[startIndex];
  }
}

export default getCompanyIter;
