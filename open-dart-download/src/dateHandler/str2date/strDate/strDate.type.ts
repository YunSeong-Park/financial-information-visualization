export interface StrDate {
  get str(): string;
  get date(): Date;
  get year(): number;
  get month(): number;
  get day(): number;
}

export interface LengthCheckStrDate extends StrDate {
  get length(): number;
}
