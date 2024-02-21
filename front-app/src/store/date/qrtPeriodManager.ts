import { produce } from "immer";
import { PERIOD_TYPE_QRT, PeriodManager, QrtPeriodType } from "./period.type";

class QrtPeriodManager extends PeriodManager<QrtPeriodType> {
  public readonly type = PERIOD_TYPE_QRT;
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

export default QrtPeriodManager;
