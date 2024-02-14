export type Company = {
  corp_code: string;
  corp_name: string;
  stock_code?: string;
  modify_date: string;
};

export type StockCompay = Company & { stock_code: number };

export const isStockCompany = (company: Company): company is StockCompay => {
  if (!company.stock_code) {
    return false;
  }
  return company.stock_code.length === 6;
};

export const isQrt = (num: number): num is Qrt => {
  return [1, 2, 3, 4].includes(num);
};
export type Qrt = 1 | 2 | 3 | 4;

export const REPORT_CODE = {
  1: "11013",
  2: "11012",
  3: "11014",
  4: "11011",
} as const;

export type ReportCode = (typeof REPORT_CODE)[Qrt];

export const code2Qrt = (code: string): Qrt => {
  const quarterString = Object.keys(REPORT_CODE).find(
    (key: unknown) => REPORT_CODE[key as Qrt] === code
  );

  const qrt = parseInt(quarterString || "1");

  if (!isQrt(qrt)) {
    throw Error(`${code}는 유효한 레포트 코드(분기 코드)가 아닙니다.`);
  }
  return qrt;
};
export type FnCFSReport = {
  rcept_no: string;
  reprt_code: string;
  bsns_year: string;
  corp_code: string;
  sj_div: string;
  sj_nm: string;
  account_id: string;
  account_nm: string;
  account_detail: string;
  thstrm_nm: string;
  thstrm_amount: string;
  frmtrm_nm: string;
  frmtrm_amount: string;
  ord: string;
  currency: string;
}[];
