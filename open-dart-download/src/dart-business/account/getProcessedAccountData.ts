import { readFnReportList } from "../../fileSystemService/readReports";
import { code2Qrt } from "../company/company.type";
import { Account } from "./account.type";
import { Account as AccountSQL } from "@prisma/client";

function* getProcessedAccountData(): IterableIterator<AccountSQL> {
  const fnReports = readFnReportList();

  let report: Account[];
  let prevReport: Account[] | undefined;
  while ((report = fnReports.next().value)) {
    for (const account of report) {
      if (account.sj_div === "SCE") continue;
      let account_value = BigInt(account.thstrm_amount.split(".")[0] || "0");

      const isPrevValidate =
        code2Qrt(account.reprt_code) !== 1 &&
        !Boolean(account.thstrm_add_amount) &&
        account.sj_div !== "BS";

      if (isPrevValidate) {
        const prev = prevReport?.find(
          (prev) => prev.account_id === account.account_id
        );
        if (prev) {
          account_value -= BigInt(
            prev.thstrm_add_amount?.split(".")[0] ||
              prev.thstrm_amount.split(".")[0] ||
              "0"
          );
        }
      }

      yield {
        report_rept_no: account.rcept_no,
        account_name: account.account_nm,
        account_value: BigInt(account_value),
        // account_id: account.account_id,
        sj_name: account.sj_nm,
      };
    }

    prevReport = report;
  }
}

export default getProcessedAccountData;
