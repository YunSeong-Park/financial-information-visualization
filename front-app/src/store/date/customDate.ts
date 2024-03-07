export type PeriodDatePlainObj = YearDatePlainObj | QrtDatePlainObj;

export type YearDatePlainObj = { year: number };
export type QrtDatePlainObj = { year: number; qrt: number };

export const isPeriodDate = (date: unknown): date is PeriodDate => {
  return (
    date instanceof Date && ["year", "qrt"].includes((date as PeriodDate).type)
  );
};

export interface PeriodDate<T extends Date = Date> extends Date {
  get type(): "year" | "qrt";
  getDateList(date: PeriodDate): PeriodDate[];
  toString(): string;
  toPlain(): PeriodDatePlainObj;
}

export const PeriodDateConstructor = (
  obj: PeriodDatePlainObj
): YearDate | QrtDate => {
  if ("qrt" in obj) {
    return new QrtDate(obj);
  } else {
    return new YearDate(obj);
  }
};

export class YearDate extends Date implements PeriodDate<YearDate> {
  get type() {
    return "year" as const;
  }

  constructor({ year }: { year: number }) {
    const prev = new Date(year + 1, 0);
    super(prev.getTime() - 1);

    // return makeBlockSetter(this);
  }
  getDateList(date: YearDate): YearDate[] {
    const startYear = Math.min(date.getFullYear(), this.getFullYear());
    const endYear = Math.max(date.getFullYear(), this.getFullYear());

    return new Array(endYear - startYear + 1)
      .fill(null)
      .map((_, i) => new YearDate({ year: startYear + i }));
  }

  toString() {
    return `${this.getFullYear()}년`;
  }

  toPlain() {
    return {
      year: this.getFullYear(),
    };
  }
}

export class QrtDate extends Date implements PeriodDate<QrtDate> {
  get type() {
    return "qrt" as const;
  }
  private _qrt: number;

  constructor({ year, qrt }: { year: number; qrt: number }) {
    if (![1, 2, 3, 4].includes(qrt)) {
      throw Error(`${qrt}는 1,2,3,4 이 아닙니다.`);
    }

    const prev = new Date(year, qrt * 3);
    super(prev.getTime() - 1);
    this._qrt = qrt;

    // return makeBlockSetter(this);
  }

  getDateList(date: QrtDate): QrtDate[] {
    const startDate = this.getTime() < date.getTime() ? this : date;
    const endDate = this === startDate ? date : this;

    const dateList: QrtDate[] = [];

    let currDate: QrtDate;
    let year = startDate.getFullYear();
    let qrt = startDate.getQrt();

    while ((currDate = new QrtDate({ year, qrt })) <= endDate) {
      dateList.push(currDate);

      qrt++;
      if (qrt === 5) {
        qrt = 1;
        year++;
      }
    }

    return dateList;
  }

  getQrt() {
    return this._qrt;
  }

  toString() {
    return `${this.getFullYear()}년 ${this._qrt}분기`;
  }

  toPlain() {
    return {
      year: this.getFullYear(),
      qrt: this.getQrt(),
    };
  }
}
