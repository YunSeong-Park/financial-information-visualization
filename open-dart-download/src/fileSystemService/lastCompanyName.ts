import fs from "fs";
import { FILE_ROOT_PATH } from "./fileSystem.const";
import writeFileWithDirectory from "./writeFileWithDirectory";

const PATH = FILE_ROOT_PATH;
const FILE_NAME = "last-company.txt";

export const writeLastCompanyName = (companyName: string) => {
  writeFileWithDirectory(FILE_NAME, companyName, PATH);
};

export const readLastCompanyName = () => {
  const companyName = fs.readFileSync(`${PATH}/${FILE_NAME}`, "utf-8");

  return companyName;
};
