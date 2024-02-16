import { StrDate } from "../strDate/strDate.type";

const DateValidateErrorMixin = <TBase extends Constructor<StrDate>>(
  Base: TBase
) => {
  return class extends Base {
    constructor(...args: any[]) {
      super(...args);
      this._validateDate();
    }

    private _validateDate() {
      if (
        this.date.getFullYear() !== this.year ||
        this.date.getMonth() + 1 !== this.month ||
        this.date.getDate() !== this.day
      ) {
        throw Error(`${this.str}은 유효하지 않은 날짜입니다.`);
      }
    }
  };
};

export default DateValidateErrorMixin;
