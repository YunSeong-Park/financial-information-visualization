import YYYYMMDD from "./strDate/yyyymmdd";

const _str2dateObj = {
  yyyymmdd: (str: string) => {
    const strDate = new YYYYMMDD(str);

    return strDate.date;
  },
} as const;

type Format = keyof typeof _str2dateObj;

export const str2date = (str: string, format: Format): Date => {
  return _str2dateObj[format](str);
};
