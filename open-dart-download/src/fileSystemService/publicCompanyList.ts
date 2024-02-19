import fs from "fs";

import { getPublicCompanyList } from "../dart-business/company/getCompanyList";
import { FILE_ROOT_PATH } from "./fileSystem.const";
import writeFileWithDirectory from "./writeFileWithDirectory";
import { PublicCompay } from "../dart-business/company/company.type";

const PATH = FILE_ROOT_PATH;
const FILE_NAME = "상장회사.json";

export const existPublicCompanyList = () => {
  return fs.existsSync(`${PATH}/${FILE_NAME}`);
};

export const writePublicCompanyList = async () => {
  const publicCompanyList = await getPublicCompanyList();
  const json = JSON.stringify(publicCompanyList, null, 4);

  writeFileWithDirectory(FILE_NAME, json, PATH);
};

export const readPublicCompanyList = () => {
  if (!existPublicCompanyList()) {
    throw Error(`${FILE_NAME}파일이 존재하지 않습니다.`);
  }

  const json = fs.readFileSync(`${PATH}/${FILE_NAME}`, "utf8");
  const publicCompanyList: PublicCompay[] = JSON.parse(json);

  return publicCompanyList;
};
