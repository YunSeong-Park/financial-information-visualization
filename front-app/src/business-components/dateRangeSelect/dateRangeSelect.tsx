"use client";

import MultiSelect from "@/presentation-components/multiSelect/multiSelect";
import { useVisualizationStore } from "@/store/visualizationStore";

const DateRangeSelect = () => {
  const period = useVisualizationStore((state) => state.period);
  const setPeriod = useVisualizationStore((state) => state.setPeriod);

  return (
    <MultiSelect
      itemList={period.dateList}
      value={period.period}
      valueLength={2}
      onValueChange={(value) => {
        if (value.length !== 2) {
          return;
        }
        const lowIndex = value[0] < value[1] ? 0 : 1;

        setPeriod([value[lowIndex], value[1 - lowIndex]]);
      }}
      itemLabelRenderer={(date) => date.toString()}
      triggerLabelRenderer={(period) =>
        period.map((date) => date.toString()).join(" ~ ")
      }
    />
  );
};

export default DateRangeSelect;
