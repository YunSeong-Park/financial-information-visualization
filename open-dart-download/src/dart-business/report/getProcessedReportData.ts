import { readFnReportList } from "../../fileSystemService/readReports";
import { Account } from "../account/account.type";
import { Report } from "@prisma/client";
import { code2Qrt } from "../company/company.type";

function* getProcessedReportData(): IterableIterator<Report> {
  const fnReports = readFnReportList();

  let report: Account[];

  while ((report = fnReports.next().value)) {
    yield {
      rcept_no: report[0].rcept_no,
      corp_code: report[0].corp_code,
      qrt: code2Qrt(report[0].reprt_code),
      year: parseInt(report[0].bsns_year),
    };
  }
}

export default getProcessedReportData;
