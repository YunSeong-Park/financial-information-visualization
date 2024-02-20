import { create } from "zustand";
import { immerable, produce } from "immer";
import { QrtDate, YearDate } from "@/store/date/customDate";

type YearPeriodType = {
  type: "year";
  date: YearDate;
};
type QrtPeriodType = {
  type: "qrt";
  date: QrtDate;
};
type Stack4QrtPeriodType = {
  type: "4qrtStack";
  date: QrtDate;
};

export type PeriodType = YearPeriodType | QrtPeriodType | Stack4QrtPeriodType;

abstract class PeriodManager<Type extends PeriodType = PeriodType> {
  [immerable] = true;

  abstract readonly type: Type["type"];
  abstract get dateList(): Type["date"][];

  abstract period: [Type["date"], Type["date"]];

  abstract updatePeriod(
    period: [Type["date"], Type["date"]]
  ): PeriodManager<Type>;
}

class YearPeriodManager extends PeriodManager<YearPeriodType> {
  public readonly type = "year";
  private _dateList: YearPeriodType["date"][];
  public period: [YearPeriodType["date"], YearPeriodType["date"]];

  constructor({
    dateRange,
  }: {
    dateRange: [YearPeriodType["date"], YearPeriodType["date"]];
  }) {
    super();

    this._dateList = dateRange[0].getDateList(dateRange[1]);

    this.period = [this._dateList.at(0)!, this._dateList.at(-1)!];
  }

  get dateList() {
    return this._dateList;
  }
  updatePeriod(period: [YearPeriodType["date"], YearPeriodType["date"]]) {
    return produce(this, (draft: PeriodManager<YearPeriodType>) => {
      if (draft.period[0] !== period[0]) {
        draft.period[0] = period[0];
      }
      if (draft.period[1] !== period[1]) {
        draft.period[1] = period[1];
      }
    });
  }
}

class QrtPeriodManager extends PeriodManager<QrtPeriodType> {
  public readonly type = "qrt";
  private _dateList: QrtPeriodType["date"][];
  public period: [QrtPeriodType["date"], QrtPeriodType["date"]];

  constructor({
    dateRange,
  }: {
    dateRange: [QrtPeriodType["date"], QrtPeriodType["date"]];
  }) {
    super();

    this._dateList = dateRange[0].getDateList(dateRange[1]);

    this.period = [this._dateList.at(0)!, this._dateList.at(-1)!];
  }

  get dateList() {
    return this._dateList;
  }
  updatePeriod(period: [QrtPeriodType["date"], QrtPeriodType["date"]]) {
    return produce(this, (draft: PeriodManager<QrtPeriodType>) => {
      if (draft.period[0] !== period[0]) {
        draft.period[0] = period[0];
      }
      if (draft.period[1] !== period[1]) {
        draft.period[1] = period[1];
      }
    });
  }
}

class Stack4QrtPeriodManager extends PeriodManager<Stack4QrtPeriodType> {
  public readonly type = "4qrtStack";
  private _dateList: Stack4QrtPeriodType["date"][];
  public period: [Stack4QrtPeriodType["date"], Stack4QrtPeriodType["date"]];

  constructor({
    dateRange,
  }: {
    dateRange: [Stack4QrtPeriodType["date"], Stack4QrtPeriodType["date"]];
  }) {
    super();

    this._dateList = dateRange[0].getDateList(dateRange[1]);

    this.period = [this._dateList.at(0)!, this._dateList.at(-1)!];
  }

  get dateList() {
    return this._dateList;
  }
  updatePeriod(
    period: [Stack4QrtPeriodType["date"], Stack4QrtPeriodType["date"]]
  ) {
    return produce(this, (draft: PeriodManager<Stack4QrtPeriodType>) => {
      if (draft.period[0] !== period[0]) {
        draft.period[0] = period[0];
      }
      if (draft.period[1] !== period[1]) {
        draft.period[1] = period[1];
      }
    });
  }
}

export const usePeriod = create<{
  period: PeriodManager;
  setPeriod: (period: [PeriodType["date"], PeriodType["date"]]) => void;
  switchType: (type: PeriodType["type"]) => void;
}>((set, state) => {
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
});
