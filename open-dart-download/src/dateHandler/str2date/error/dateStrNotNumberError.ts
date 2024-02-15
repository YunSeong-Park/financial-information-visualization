import { StrDate } from "../strDate/strDate.type";

const NotNumberErrorMixin = <TBase extends Constructor<StrDate>>(
  Base: TBase
) => {
  return class extends Base {
    constructor(...args: any[]) {
      super(...args);
      this._validateNumber();
    }

    private _validateNumber() {
      if (!Boolean(Number(this.str))) {
        throw Error(`${this.str}은 숫자가 아닙니다.`);
      }
    }
  };
};

export default NotNumberErrorMixin;
