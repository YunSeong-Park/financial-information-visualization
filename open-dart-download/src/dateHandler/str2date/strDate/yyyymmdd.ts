import LengthErrorMixin from "../error/dateStrLengthError";
import NotNumberErrorMixin from "../error/dateStrNotNumberError";
import DateValidateErrorMixin from "../error/dateStrValidateError";
import { LengthCheckStrDate } from "./strDate.type";

class _YYYYMMDDStr implements LengthCheckStrDate {
  private _length = 8;
  constructor(private _str: string) {}

  get length() {
    return this._length;
  }

  get str() {
    return this._str;
  }

  get year() {
    return Number(this._str.substring(0, 4));
  }
  get month() {
    return Number(this._str.substring(4, 6));
  }
  get day() {
    return Number(this._str.substring(6, 8));
  }

  get date() {
    return new Date(this.year, this.month - 1, this.day);
  }
}

const YYYYMMDD = DateValidateErrorMixin(
  NotNumberErrorMixin(LengthErrorMixin(_YYYYMMDDStr))
);

export default YYYYMMDD;
