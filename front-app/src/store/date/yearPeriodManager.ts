import { produce } from "immer";
import { PERIOD_TYPE_YEAR, PeriodManager, YearPeriodType } from "./period.type";

class YearPeriodManager extends PeriodManager<YearPeriodType> {
  public readonly type = PERIOD_TYPE_YEAR;
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

export default YearPeriodManager;
