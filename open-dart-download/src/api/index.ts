import * as dotenv from "dotenv";
import axios from "axios";
import {
  FnCFSReport,
  Qrt,
  REPORT_CODE,
} from "../dart-business/company/company.type";

// .env 파일에서 환경 변수 로드
dotenv.config();

const DART_API_KEY = process.env.DART_API_KEY;
const DART_URL = process.env.DART_URL;

export const downloadCompanyList = async () => {
  const res = await axios<ArrayBuffer>({
    url: `${DART_URL}/api/corpCode.xml`,
    method: "GET",
    responseType: "arraybuffer",
    params: {
      crtfc_key: DART_API_KEY,
    },
  });

  return res.data;
};

export const getfnlttSinglAcntAll = async ({
  corp_code,
  year,
  qrt,
  isFs,
}: {
  corp_code: string;
  year: string;
  qrt: Qrt;
  isFs: boolean;
}) => {
  const res = await axios<{
    status: string;
    message: string;
    list: FnCFSReport;
  }>({
    url: `${DART_URL}/api/fnlttSinglAcntAll.json`,
    method: "GET",
    responseType: "json",
    params: {
      crtfc_key: DART_API_KEY,
      corp_code,
      bsns_year: year,
      reprt_code: REPORT_CODE[qrt],
      fs_div: isFs ? "CFS" : "OFS",
    },
  });

  if (!res.data.list) {
    throw Error(res.data.message);
  }

  return res.data.list;
};
