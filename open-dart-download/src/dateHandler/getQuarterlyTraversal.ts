import { QrtDate, compareQrtDate } from "./date.type";

function* getQrtTraversal(
  startTime: QrtDate,
  endTime: QrtDate
): IterableIterator<QrtDate> {
  if (compareQrtDate(startTime, endTime) === -1) {
    throw Error("start date가 end date 이후 날짜입니다.");
  }

  const currentTime = { ...startTime };

  while (compareQrtDate(currentTime, endTime) !== -1) {
    yield { ...currentTime };

    if (currentTime.qrt < 4) {
      currentTime.qrt++;
    } else {
      currentTime.qrt = 1;
      currentTime.year++;
    }
  }
}
export default getQrtTraversal;
