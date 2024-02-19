import { Company } from "@prisma/client";
import { readFnCompanyList } from "../../fileSystemService/readReports";
import { PublicCompay } from "./company.type";

function* getProcessedCompanyData(): IterableIterator<Company> {
  const fnCompany = readFnCompanyList();

  let company: PublicCompay;

  while ((company = fnCompany.next().value)) {
    yield {
      corp_code: company.corp_code,
      corp_name: company.corp_name,
      stock_code: company.stock_code,
    };
  }
}

export default getProcessedCompanyData;
