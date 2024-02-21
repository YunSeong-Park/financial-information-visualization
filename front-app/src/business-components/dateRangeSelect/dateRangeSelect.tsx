"use client";

import MultiSelect from "@/presentation-components/multiSelect/multiSelect";
import { usePeriod } from "@/store/date/usePeriod";

const DateRangeSelect = () => {
  const period = usePeriod();

  return (
    <MultiSelect
      itemList={period.period.dateList}
      value={period.period.period}
      valueLength={2}
      onValueChange={(value) => {
        if (value.length !== 2) {
          return;
        }
        const lowIndex = value[0] < value[1] ? 0 : 1;

        period.setPeriod([value[lowIndex], value[1 - lowIndex]]);
      }}
      itemLabelRenderer={(date) => date.toString()}
      triggerLabelRenderer={(period) =>
        period.map((date) => date.toString()).join(" ~ ")
      }
    />
  );
};

export default DateRangeSelect;
