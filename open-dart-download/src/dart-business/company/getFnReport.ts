import { getfnlttSinglAcntAll } from "../../api";
import { Qrt } from "../../dateHandler/date.type";
import { Company, FnCFSReport } from "./company.type";

const getReport = async (company: Company, year: number, qrt: Qrt) => {
  let fnReport: FnCFSReport;
  try {
    fnReport = await getfnlttSinglAcntAll({
      corp_code: company.corp_code,
      year: year.toString(),
      qrt,
      isFs: true,
    });
  } catch (e) {
    fnReport = await getfnlttSinglAcntAll({
      corp_code: company.corp_code,
      year: year.toString(),
      qrt,
      isFs: false,
    });
  }

  return fnReport;
};

export default getReport;
