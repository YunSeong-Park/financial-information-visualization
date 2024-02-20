import fs from "fs";
import { readPublicCompanyList } from "./publicCompanyList";
import { FN_REPORT_PATH } from "./fileSystem.const";
import { Company, PublicCompay } from "../dart-business/company/company.type";

import { Account } from "../dart-business/account/account.type";

const PATH = FN_REPORT_PATH;

export function* readFnCompanyList(): IterableIterator<PublicCompay> {
  const files = fs.readdirSync(PATH);

  const companyList = readPublicCompanyList();

  let companyName: string | undefined;
  while ((companyName = files.pop())) {
    const company = companyList.find(
      (companyInfo) => companyInfo.corp_name === companyName
    );
    if (company) yield company;
  }
}

export function* readFnReportList(): IterableIterator<Account[]> {
  const fnCompanyList = readFnCompanyList();

  let company: Company | undefined;
  while ((company = fnCompanyList.next().value)) {
    const reportNameList = fs.readdirSync(`${PATH}/${company.corp_name}`);

    for (const reportName of reportNameList) {
      const reportString = fs.readFileSync(
        `${PATH}/${company!.corp_name}/${reportName}`,
        "utf8"
      );
      try {
        const report: Account[] = JSON.parse(reportString);
        yield report.map((account) => {
          if (company) return { ...account, corp_code: company.corp_code };

          return account;
        });
      } catch (e) {
        console.log(e, reportString, company);
      }
    }
  }
}
