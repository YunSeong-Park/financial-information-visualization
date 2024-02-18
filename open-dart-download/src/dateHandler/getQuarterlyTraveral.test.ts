import { QrtDate } from "./date.type";
import getQrtTraversal from "./getQuarterlyTraversal";

describe("getQuarterlyTraveral", () => {
  test("같은 년도의 QrtDate 입력", () => {
    const start: QrtDate = { year: 2021, qrt: 1 };
    const end: QrtDate = { year: 2021, qrt: 4 };

    const qrtTraversal = getQrtTraversal(start, end);
    const qrtDateList = Array.from(qrtTraversal);

    const expected = [
      { year: 2021, qrt: 1 },
      { year: 2021, qrt: 2 },
      { year: 2021, qrt: 3 },
      { year: 2021, qrt: 4 },
    ];
    expect(JSON.stringify(qrtDateList)).toBe(JSON.stringify(expected));
  });

  test("년도가 넘어가는 QrtDate 입력", () => {
    const start: QrtDate = { year: 2021, qrt: 1 };
    const end: QrtDate = { year: 2023, qrt: 4 };

    const qrtTraversal = getQrtTraversal(start, end);
    const qrtDateList = Array.from(qrtTraversal);

    const expected = [
      { year: 2021, qrt: 1 },
      { year: 2021, qrt: 2 },
      { year: 2021, qrt: 3 },
      { year: 2021, qrt: 4 },
      { year: 2022, qrt: 1 },
      { year: 2022, qrt: 2 },
      { year: 2022, qrt: 3 },
      { year: 2022, qrt: 4 },
      { year: 2023, qrt: 1 },
      { year: 2023, qrt: 2 },
      { year: 2023, qrt: 3 },
      { year: 2023, qrt: 4 },
    ];
    expect(JSON.stringify(qrtDateList)).toBe(JSON.stringify(expected));
  });

  test("startDate가 endDate 이후인 경우 Error 발생 - 년도", () => {
    const start: QrtDate = { year: 2021, qrt: 1 };
    const end: QrtDate = { year: 2020, qrt: 4 };

    const act = () => {
      [...getQrtTraversal(start, end)];
    };
    expect(act).toThrow("start date가 end date 이후 날짜입니다.");
  });

  test("startDate가 endDate 이후인 경우 Error 발생 - 분기", () => {
    const start: QrtDate = { year: 2021, qrt: 4 };
    const end: QrtDate = { year: 2021, qrt: 3 };

    const act = () => {
      [...getQrtTraversal(start, end)];
    };
    expect(act).toThrow("start date가 end date 이후 날짜입니다.");
  });
});
