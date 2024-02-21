"use client";
import { PERIOD_TYPE_LIST } from "@/store/date/period.type";
import { usePeriod } from "@/store/date/usePeriod";
import { Select } from "@radix-ui/themes";

const PeriodUnitSelect = () => {
  const type = usePeriod((state) => state.period.type);
  const switchType = usePeriod((state) => state.switchType);
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
