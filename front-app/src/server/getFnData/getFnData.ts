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

import { getYearAccountData } from "./getYearAccountData";
import { getQrtAccountData } from "./getQrtAccountData";
import { get4QrtStackAccountData } from "./get4QrtStackAccountData";
import {
  PERIOD_TYPE_QRT,
  PERIOD_TYPE_QRT4_Stack,
  PERIOD_TYPE_YEAR,
  PeriodType,
  PeriodTypeQrt,
  PeriodTypeQrt4Stack,
} from "@/store/date/period.type";

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
  periodType: PeriodTypeQrt | PeriodTypeQrt4Stack;
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

  if (periodType === PERIOD_TYPE_YEAR) {
    const period = [startDate, endDate] as [YearDate, YearDate];
    return getYearAccountData({ corp_code, period, accounts });
  }

  if (periodType === PERIOD_TYPE_QRT) {
    const period = [startDate, endDate] as [QrtDate, QrtDate];

    return getQrtAccountData({
      corp_code,
      period,
      accounts,
    });
  }

  if (PERIOD_TYPE_QRT4_Stack === periodType) {
    const period = [startDate, endDate] as [QrtDate, QrtDate];
    return get4QrtStackAccountData({ corp_code, period, accounts });
  }

  throw Error("");
}
