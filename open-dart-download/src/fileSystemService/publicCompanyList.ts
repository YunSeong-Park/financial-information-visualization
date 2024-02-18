import fs from "fs";

import { getPublicCompanyList } from "../dart-business/company/getCompanyList";
import { FILE_ROOT_PATH } from "./fileSystem.const";
import writeFileWithDirectory from "./writeFileWithDirectory";
import { Company } from "../dart-business/company/company.type";

const PATH = FILE_ROOT_PATH;
const FILE_NAME = "상장회사.json";

export const writePublicCompanyList = async () => {
  const publicCompanyList = await getPublicCompanyList();
  const json = JSON.stringify(publicCompanyList, null, 4);

  writeFileWithDirectory(FILE_NAME, json, PATH);
};

export const readPublicCompanyList = async () => {
  const exists = fs.existsSync(`${PATH}/${FILE_NAME}`);

  if (!exists) {
    await writePublicCompanyList();
  }

  const json = fs.readFileSync(`${PATH}/${FILE_NAME}`, "utf8");
  const publicCompanyList: Company[] = JSON.parse(json);

  return publicCompanyList;
};
