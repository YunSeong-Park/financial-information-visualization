export const isQrt = (num: number): num is Qrt => {
  return [1, 2, 3, 4].includes(num);
};

export type Qrt = 1 | 2 | 3 | 4;

export type QrtDate = {
  year: number;
  qrt: Qrt;
};
