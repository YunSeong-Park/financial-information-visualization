"use client";
import { Text } from "@radix-ui/themes";
import styles from "./noDataVisChart.module.scss";
import WarningIcon from "@/presentation-components/icon/warningIcon";

const NoDataVisChart = () => {
  return (
    <div className={styles.root}>
      <WarningIcon className={styles.icon} />
      <Text className={styles.text}>계정을 선택해 주세요.</Text>
    </div>
  );
};

export default NoDataVisChart;
