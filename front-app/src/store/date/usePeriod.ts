import { StateCreator } from "zustand";

import { QrtDate, YearDate } from "@/store/date/customDate";
import { PeriodManager, PeriodType } from "./period.type";
import YearPeriodManager from "./yearPeriodManager";
import QrtPeriodManager from "./qrtPeriodManager";
import Stack4QrtPeriodManager from "./stack4QrtPeriodManager";

export type PeriodState = {
  period: PeriodManager;
};

export type PeriodAction = {
  setPeriod: (period: [PeriodType["date"], PeriodType["date"]]) => void;
  switchType: (type: PeriodType["type"]) => void;
};

export const createPeriodStore: StateCreator<PeriodState & PeriodAction> = (
  set,
  state
) => {
  const periods = {
    year: new YearPeriodManager({
      dateRange: [new YearDate({ year: 2017 }), new YearDate({ year: 2023 })],
    }),
    qrt: new QrtPeriodManager({
      dateRange: [
        new QrtDate({ year: 2017, qrt: 1 }),
        new QrtDate({ year: 2023, qrt: 3 }),
      ],
    }),
    "4qrtStack": new Stack4QrtPeriodManager({
      dateRange: [
        new QrtDate({ year: 2017, qrt: 1 }),
        new QrtDate({ year: 2023, qrt: 3 }),
      ],
    }),
  } as const;

  return {
    period: periods["year"],
    setPeriod: (period: [PeriodType["date"], PeriodType["date"]]) => {
      set({ period: state().period.updatePeriod(period) });
    },
    switchType: (type: PeriodType["type"]) => {
      set({ period: periods[type] });
    },
  };
};
