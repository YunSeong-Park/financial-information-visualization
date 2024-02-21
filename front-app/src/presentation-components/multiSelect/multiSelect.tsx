"use client";

import { Button, Popover, Text } from "@radix-ui/themes";
import { useEffect, useMemo, useState } from "react";

import CheckIcon from "../icon/checkIcon";
import styles from "./multiSelect.module.scss";
import DownIcon from "../icon/downIcon";

type ValueType = object | string | number;

interface MultiSelectProps<T extends ValueType> {
  triggerLabelRenderer?: (values: T[]) => string;
  itemLabelRenderer?: (item: T) => string;
  itemList: T[];
  value: T[];
  onValueChange: (items: T[]) => void;
  valueLength?: number;
}
const defaultTriggerLabelRenderer = <T extends ValueType>(values: T[]) => {
  return values.map(defaultItemLabelRenderer).join(", ");
};

const defaultItemLabelRenderer = <T extends ValueType>(value: T) => {
  switch (typeof value) {
    case "string":
      return value;
    case "number":
      return value.toString();
    case "object":
      return value.toString();
    default:
      throw Error(`${typeof value}는 MultiSelect에 허용되지 않은 타입입니다.`);
  }
};

const MultiSelect = <T extends ValueType>({
  triggerLabelRenderer = defaultTriggerLabelRenderer,
  itemLabelRenderer = defaultItemLabelRenderer,
  itemList,
  value,
  onValueChange,
  valueLength = 0, // 없는 경우 무한 선택
}: MultiSelectProps<T>) => {
  const [open, setOpen] = useState(false);
  const [localValue, setLocalValue] = useState<T[]>([...value]);

  useEffect(() => {
    if (JSON.stringify(value) !== JSON.stringify(localValue)) {
      setLocalValue([...value]);
    }
  }, [value]);

  const itemLabelList = useMemo(
    () => itemList.map(itemLabelRenderer),
    [itemLabelRenderer, itemList]
  );

  const handleLocalValueItem = (value: T) => {
    const valueLabel = itemLabelRenderer(value);

    const newLocalValue = [...localValue];
    const targetIndex = newLocalValue.findIndex(
      (itemLabel) => itemLabelRenderer(itemLabel) === valueLabel
    );

    if (targetIndex === -1) {
      newLocalValue.push(value);
    } else {
      newLocalValue.splice(targetIndex, 1);
    }
    const isOverLength = valueLength && valueLength < newLocalValue.length;

    if (isOverLength) {
      setLocalValue([value]);
      onValueChange([value]);
      return;
    }

    setLocalValue(newLocalValue);
    onValueChange([...newLocalValue]);
    setOpen(newLocalValue.length !== valueLength);
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      if (valueLength) {
        setLocalValue([...value]);
      } else {
        onValueChange([...localValue]);
      }
    }

    setOpen(open);
  };

  return (
    <Popover.Root open={open} onOpenChange={onOpenChange}>
      <Popover.Trigger>
        <Button variant="surface" className={styles["trigger-button"]}>
          {triggerLabelRenderer(value)}
          <DownIcon />
        </Button>
      </Popover.Trigger>
      <Popover.Content
        side="top"
        sideOffset={-3}
        align="center"
        className={styles.content}
      >
        {itemList.map((item, i) => (
          <div
            className={styles.item}
            key={itemLabelList[i]}
            onClick={() => handleLocalValueItem(item)}
          >
            <Text className={styles["icon-container"]}>
              {localValue
                .map((item) => itemLabelRenderer(item))
                .includes(itemLabelList[i]) && <CheckIcon />}
            </Text>
            <Text>{itemLabelList[i]}</Text>
          </div>
        ))}
      </Popover.Content>
    </Popover.Root>
  );
};

export default MultiSelect;
