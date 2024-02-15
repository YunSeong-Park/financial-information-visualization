import { LengthCheckStrDate } from "../strDate/strDate.type";

const getLengthErrorMessage = (str: string, length: number) => {
  return `${str}의 길이가 ${length}이 아닙니다.`;
};

const LengthErrorMixin = <TBase extends Constructor<LengthCheckStrDate>>(
  Base: TBase
) => {
  return class extends Base {
    constructor(...args: any[]) {
      super(...args);
      this._validateLength();
    }

    private _validateLength() {
      if (this.length !== this.str.length) {
        throw Error(getLengthErrorMessage(this.str, this.length));
      }
    }
  };
};

export default LengthErrorMixin;
