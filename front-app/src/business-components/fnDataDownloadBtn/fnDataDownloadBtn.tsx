"use client";

import DownloadBtn from "@/presentation-components/downloadBtn/downloadBtn";
import useCompanyQuery from "@/query/useCompanyQuery";
import useFnDataQuery, { convertFnData2Table } from "@/query/useFnDataQuery";
import { useMemo } from "react";

const FnDataDownloadBtn = () => {
  const fnDataQuery = useFnDataQuery();
  const companyQuery = useCompanyQuery();

  const blob = useMemo(() => {
    if (fnDataQuery.data === undefined) {
      return new Blob();
    }

    const tableData = convertFnData2Table(fnDataQuery.data);
    const csvString = convert2CsvString(tableData);

    return new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  }, [fnDataQuery.data]);

  return (
    <DownloadBtn
      blob={blob}
      fileName={companyQuery.data!.corp_name}
      disabled={!fnDataQuery.data || !companyQuery.data}
    />
  );
};

export default FnDataDownloadBtn;

const convert2CsvString = (json: Record<string, string | number>[]) => {
  const csvRows = [];
  const headers = Object.keys(json[0] || {});
  csvRows.push(headers.join(",")); // 컬럼 제목 추가

  // 데이터 행 추가
  for (const row of json) {
    const values = headers.map((header) => {
      const escaped = ("" + row[header]).replace(/"/g, '\\"');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(","));
  }

  return csvRows.join("\n");
};
