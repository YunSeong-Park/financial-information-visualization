import { str2date } from "./str2date";

describe("str2date", () => {
  describe("yyyymmdd", () => {
    const foramt = "yyyymmdd";

    test("정상 케이스1", () => {
      const year = "2024";
      const month = "02";
      const day = "29";
      const str = year + month + day;

      const date = str2date(str, foramt);

      expect(date.getFullYear()).toBe(Number(year));
      expect(date.getMonth() + 1).toBe(Number(month));
      expect(date.getDate()).toBe(Number(day));
    });
    test("정상 케이스2", () => {
      const date = new Date();
      const str =
        date.getFullYear().toString() +
        (date.getMonth() + 1).toString().padStart(2, "0") +
        date.getDate().toString().padStart(2, "0");

      const newDate = str2date(str, foramt);

      expect(date.getFullYear()).toBe(newDate.getFullYear());
      expect(date.getMonth()).toBe(newDate.getMonth());
      expect(date.getDate()).toBe(newDate.getDate());
    });

    test("str 길이가 8이 아닌 경우 Error 발생", () => {
      const str = "2022920";

      const act = () => str2date(str, foramt);

      expect(act).toThrow(`${str}의 길이가 8이 아닙니다.`);
    });

    test("str이 숫자가 아니면 Error 발생", () => {
      const str = "2022192ㄱ";

      const act = () => str2date(str, foramt);

      expect(act).toThrow(`${str}은 숫자가 아닙니다.`);
    });

    describe("str이 유효한 date가 아닌 경우", () => {
      test("month가 0이면 Error 발생", () => {
        const year = "2021";
        const month = "00";
        const day = "01";

        const str = year + month + day;

        const act = () => str2date(str, foramt);

        expect(act).toThrow(`${str}은 유효하지 않은 날짜입니다.`);
      });

      test("month가 13이면 Error 발생", () => {
        const year = "2021";
        const month = "13";
        const day = "01";

        const str = year + month + day;

        const act = () => str2date(str, foramt);

        expect(act).toThrow(`${str}은 유효하지 않은 날짜입니다.`);
      });

      test("유효하지 않는 날짜면 Error 발생", () => {
        const year = "2021";
        const month = "02";
        const day = "29";

        const str = year + month + day;

        const act = () => str2date(str, foramt);

        expect(act).toThrow(`${str}은 유효하지 않은 날짜입니다.`);
      });
    });
  });
});
