export interface StrDate {
  get str(): string;
  get date(): Date;
}

export interface LengthCheckStrDate extends StrDate {
  get length(): number;
}
