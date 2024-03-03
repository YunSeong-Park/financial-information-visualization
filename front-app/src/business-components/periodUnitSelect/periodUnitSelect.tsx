"use client";
import { PERIOD_TYPE_LIST } from "@/store/date/period.type";
import { useVisualizationStore } from "@/store/visualizationStore";

import { Select } from "@radix-ui/themes";

const PeriodUnitSelect = () => {
  const type = useVisualizationStore((state) => state.period.type);
  const switchType = useVisualizationStore((state) => state.switchType);
  return (
    <Select.Root value={type} onValueChange={(value: any) => switchType(value)}>
      <Select.Trigger />
      <Select.Content side="top">
        {PERIOD_TYPE_LIST.map((period) => (
          <Select.Item key={period.value} value={period.value}>
            {period.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default PeriodUnitSelect;
