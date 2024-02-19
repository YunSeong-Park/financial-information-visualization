import getProcessedAccountData from "../dart-business/account/getProcessedAccountData";
import getProcessedCompanyData from "../dart-business/company/getProcessedCompanyData";
import getProcessedReportData from "../dart-business/report/getProcessedReportData";

import { prismaClient } from "./sql-service.const";

const createCompanys = async () => {
  const companyList = getProcessedCompanyData();

  for await (const company of companyList) {
    if (company.corp_code === "01453670") console.log(company);

    await prismaClient.company.create({ data: company });
  }
};

const createReports = async () => {
  const reports = getProcessedReportData();

  for await (const report of reports) {
    // console.log(report);
    try {
      await prismaClient.report.create({ data: report });
    } catch (e) {
      console.log(e, report);
    }
  }
};

const createAccounts = async () => {
  const accounts = getProcessedAccountData();
  for await (const account of accounts) {
    try {
      await prismaClient.account.create({ data: account });
    } catch (e) {
      console.log(e, account);
    }
  }
};

const createAll = async () => {
  await createCompanys();
  await createReports();
  await createAccounts();
};
export default createAll;
