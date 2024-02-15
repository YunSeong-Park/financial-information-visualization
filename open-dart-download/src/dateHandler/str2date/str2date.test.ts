import { str2date } from "./str2date";

describe("str2date", () => {
  describe("yyyymmdd", () => {
    const foramt = "yyyymmdd";

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
