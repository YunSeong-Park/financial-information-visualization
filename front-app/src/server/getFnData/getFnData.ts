"use server";

import {
  PeriodDateConstructor,
  PeriodDatePlainObj,
  QrtDate,
  QrtDatePlainObj,
  YearDate,
  YearDatePlainObj,
} from "@/store/date/customDate";
import { CompanyAccount } from "../getCompanyAccount";
import { PeriodType } from "@/store/date/useDataOpt";
import { getYearAccountData } from "./getYearAccountData";
import { getQrtAccountData } from "./getQrtAccountData";
import { get4QrtStackAccountData } from "./get4QrtStackAccountData";

export function getFnData(params: {
  corp_code: string;
  periodType: "year";
  period: [YearDatePlainObj, YearDatePlainObj];
  accounts: CompanyAccount[];
}): Promise<
  {
    date: PeriodDatePlainObj;
    accounts: { account_name: string; account_value: number }[];
  }[]
>;
export function getFnData(params: {
  corp_code: string;
  periodType: "qrt" | "4qrtStack";
  period: [QrtDatePlainObj, QrtDatePlainObj];
  accounts: CompanyAccount[];
}): Promise<
  {
    date: PeriodDatePlainObj;
    accounts: { account_name: string; account_value: number }[];
  }[]
>;

export async function getFnData({
  periodType,
  corp_code,
  period,
  accounts,
}: {
  periodType: PeriodType["type"];
  corp_code: string;
  period: [PeriodDatePlainObj, PeriodDatePlainObj];
  accounts: CompanyAccount[];
}): Promise<
  {
    date: PeriodDatePlainObj;
    accounts: { account_name: string; account_value: number }[];
  }[]
> {
  if (accounts.length === 0) {
    return [];
  }
  const startDate = PeriodDateConstructor(period[0]);
  const endDate = PeriodDateConstructor(period[1]);

  if (periodType === "year") {
    const period = [startDate, endDate] as [YearDate, YearDate];
    return getYearAccountData({ corp_code, period, accounts });
  }

  if ("qrt" === periodType) {
    const period = [startDate, endDate] as [QrtDate, QrtDate];

    return getQrtAccountData({
      corp_code,
      period,
      accounts,
    });
  }

  if ("4qrtStack" === periodType) {
    const period = [startDate, endDate] as [QrtDate, QrtDate];
    return get4QrtStackAccountData({ corp_code, period, accounts });
  }

  throw Error("");
}
