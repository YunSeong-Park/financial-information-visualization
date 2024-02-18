export const isQrt = (num: number): num is Qrt => {
  return [1, 2, 3, 4].includes(num);
};

export type Qrt = 1 | 2 | 3 | 4;

export type QrtDate = {
  year: number;
  qrt: Qrt;
};

export const compareQrtDate = (standard: QrtDate, target: QrtDate) => {
  if (
    standard.year < target.year ||
    (standard.year === target.year && standard.qrt < target.qrt)
  ) {
    return 1;
  }

  if (standard.year === target.year && standard.qrt === target.qrt) {
    return 0;
  }

  return -1;
};
