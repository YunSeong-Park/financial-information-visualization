import { immerable } from "immer";
import { QrtDate, YearDate } from "@/store/date/customDate";

export const PERIOD_TYPE_YEAR = "year" as const;
export const PERIOD_TYPE_QRT = "qrt" as const;
export const PERIOD_TYPE_QRT4_Stack = "4qrtStack" as const;

export const PERIOD_TYPE_LIST = [
  { value: PERIOD_TYPE_YEAR, label: "년" },
  { value: PERIOD_TYPE_QRT, label: "분기" },
  { value: PERIOD_TYPE_QRT4_Stack, label: "분기 누적" },
] as const;

export type PeriodTypeYear = typeof PERIOD_TYPE_YEAR;
export type PeriodTypeQrt = typeof PERIOD_TYPE_QRT;
export type PeriodTypeQrt4Stack = typeof PERIOD_TYPE_QRT4_Stack;

export type YearPeriodType = {
  type: PeriodTypeYear;
  date: YearDate;
};
export type QrtPeriodType = {
  type: PeriodTypeQrt;
  date: QrtDate;
};
export type Stack4QrtPeriodType = {
  type: PeriodTypeQrt4Stack;
  date: QrtDate;
};

export type PeriodType = YearPeriodType | QrtPeriodType | Stack4QrtPeriodType;

export abstract class PeriodManager<Type extends PeriodType = PeriodType> {
  [immerable] = true;

  abstract readonly type: Type["type"];
  abstract get dateList(): Type["date"][];

  abstract period: [Type["date"], Type["date"]];

  abstract updatePeriod(
    period: [Type["date"], Type["date"]]
  ): PeriodManager<Type>;
}
