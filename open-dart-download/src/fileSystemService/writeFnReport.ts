import { Company } from "../dart-business/company/company.type";
import getFnReport from "../dart-business/company/getFnReport";
import { QrtDate } from "../dateHandler/date.type";
import { FILE_ROOT_PATH } from "./fileSystem.const";
import writeFileWithDirectory from "./writeFileWithDirectory";

const PATH = FILE_ROOT_PATH + "/fn-report";

const writeFnReport = async ({
  date: { year, qrt },
  company,
}: {
  date: QrtDate;
  company: Company;
}) => {
  try {
    const fnReport = await getFnReport(company, year, qrt);
    const jsonText = JSON.stringify(fnReport, null, 4);

    writeFileWithDirectory(
      `${company.corp_name}_${year}년_${qrt}분기.json`,
      jsonText,
      `${PATH}/${company.corp_name}`
    );
  } catch (e) {
    if (e instanceof Error && e.message === "조회된 데이타가 없습니다.") {
      console.log(company.corp_name, qrt, e.message, e.name);
    } else {
      throw e;
    }
  }
};

export default writeFnReport;
