import { produce } from "immer";
import {
  PERIOD_TYPE_QRT4_Stack,
  PeriodManager,
  Stack4QrtPeriodType,
} from "./period.type";

class Stack4QrtPeriodManager extends PeriodManager<Stack4QrtPeriodType> {
  public readonly type = PERIOD_TYPE_QRT4_Stack;
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

export default Stack4QrtPeriodManager;
