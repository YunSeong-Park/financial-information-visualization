import { create } from "zustand";
import { immerable, produce } from "immer";
import { QrtDate, YearDate } from "@/store/date/customDate";

type YearPriodType = {
  type: "year";
  date: YearDate;
};
type QrtPriodType = {
  type: "qrt";
  date: QrtDate;
};
type Stack4QrtPriodType = {
  type: "4qrtStack";
  date: QrtDate;
};

export type PriodType = YearPriodType | QrtPriodType | Stack4QrtPriodType;

abstract class PriodManager<Type extends PriodType = PriodType> {
  [immerable] = true;

  abstract readonly type: Type["type"];
  abstract get dateList(): Type["date"][];

  abstract priod: [Type["date"], Type["date"]];

  abstract updatePriod(priod: [Type["date"], Type["date"]]): PriodManager<Type>;
}

class YearPriodManager extends PriodManager<YearPriodType> {
  public readonly type = "year";
  private _dateList: YearPriodType["date"][];
  public priod: [YearPriodType["date"], YearPriodType["date"]];

  constructor({
    dateRange,
  }: {
    dateRange: [YearPriodType["date"], YearPriodType["date"]];
  }) {
    super();

    this._dateList = dateRange[0].getDateList(dateRange[1]);

    this.priod = [this._dateList.at(0)!, this._dateList.at(-1)!];
  }

  get dateList() {
    return this._dateList;
  }
  updatePriod(priod: [YearPriodType["date"], YearPriodType["date"]]) {
    return produce(this, (draft: PriodManager<YearPriodType>) => {
      if (draft.priod[0] !== priod[0]) {
        draft.priod[0] = priod[0];
      }
      if (draft.priod[1] !== priod[1]) {
        draft.priod[1] = priod[1];
      }
    });
  }
}

class QrtPriodManager extends PriodManager<QrtPriodType> {
  public readonly type = "qrt";
  private _dateList: QrtPriodType["date"][];
  public priod: [QrtPriodType["date"], QrtPriodType["date"]];

  constructor({
    dateRange,
  }: {
    dateRange: [QrtPriodType["date"], QrtPriodType["date"]];
  }) {
    super();

    this._dateList = dateRange[0].getDateList(dateRange[1]);

    this.priod = [this._dateList.at(0)!, this._dateList.at(-1)!];
  }

  get dateList() {
    return this._dateList;
  }
  updatePriod(priod: [QrtPriodType["date"], QrtPriodType["date"]]) {
    return produce(this, (draft: PriodManager<QrtPriodType>) => {
      if (draft.priod[0] !== priod[0]) {
        draft.priod[0] = priod[0];
      }
      if (draft.priod[1] !== priod[1]) {
        draft.priod[1] = priod[1];
      }
    });
  }
}

class Stack4QrtPriodManager extends PriodManager<Stack4QrtPriodType> {
  public readonly type = "4qrtStack";
  private _dateList: Stack4QrtPriodType["date"][];
  public priod: [Stack4QrtPriodType["date"], Stack4QrtPriodType["date"]];

  constructor({
    dateRange,
  }: {
    dateRange: [Stack4QrtPriodType["date"], Stack4QrtPriodType["date"]];
  }) {
    super();

    this._dateList = dateRange[0].getDateList(dateRange[1]);

    this.priod = [this._dateList.at(0)!, this._dateList.at(-1)!];
  }

  get dateList() {
    return this._dateList;
  }
  updatePriod(priod: [Stack4QrtPriodType["date"], Stack4QrtPriodType["date"]]) {
    return produce(this, (draft: PriodManager<Stack4QrtPriodType>) => {
      if (draft.priod[0] !== priod[0]) {
        draft.priod[0] = priod[0];
      }
      if (draft.priod[1] !== priod[1]) {
        draft.priod[1] = priod[1];
      }
    });
  }
}

export const usePriod = create<{
  priod: PriodManager;
  setPriod: (priod: [PriodType["date"], PriodType["date"]]) => void;
  switchType: (type: PriodType["type"]) => void;
}>((set, state) => {
  const priods = {
    year: new YearPriodManager({
      dateRange: [new YearDate({ year: 2017 }), new YearDate({ year: 2023 })],
    }),
    qrt: new QrtPriodManager({
      dateRange: [
        new QrtDate({ year: 2017, qrt: 1 }),
        new QrtDate({ year: 2023, qrt: 3 }),
      ],
    }),
    "4qrtStack": new Stack4QrtPriodManager({
      dateRange: [
        new QrtDate({ year: 2017, qrt: 1 }),
        new QrtDate({ year: 2023, qrt: 3 }),
      ],
    }),
  } as const;

  return {
    priod: priods["year"],
    setPriod: (priod: [PriodType["date"], PriodType["date"]]) => {
      set({ priod: state().priod.updatePriod(priod) });
    },
    switchType: (type: PriodType["type"]) => {
      set({ priod: priods[type] });
    },
  };
});
