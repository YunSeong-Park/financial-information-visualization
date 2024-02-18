import getQrtTraversal from "../dateHandler/getQuarterlyTraversal";
import { writeLastCompanyName } from "../fileSystemService/lastCompanyName";
import {
  existPublicCompanyList,
  writePublicCompanyList,
} from "../fileSystemService/publicCompanyList";
import writeFnReport from "../fileSystemService/writeFnReport";
import getCompanyIter from "./companyIter";
import getCompositionIter from "./compositionIter";
import processIterableIterator from "./processIterableIterator";

const startTime = {
  year: 2016,
  qrt: 1,
} as const;
const endTime = {
  year: 2023,
  qrt: 3,
} as const;

const apiDownloadService = async () => {
  const exists = existPublicCompanyList();

  if (!exists) {
    await writePublicCompanyList();
  }

  const companyIter = getCompanyIter();

  const qrtTraversal = getQrtTraversal(startTime, endTime);

  const companyQrtIter = getCompositionIter(companyIter, qrtTraversal);

  const process = processIterableIterator(companyQrtIter);

  let i = 0;

  for await (const v of process) {
    try {
      await writeFnReport({ company: v[0], date: v[1] });
      console.log(i++);
      console.log(v);
    } catch (e) {
      console.error(e);
      writeLastCompanyName(v[0].corp_name);
      return;
    }
  }
};

export default apiDownloadService;
