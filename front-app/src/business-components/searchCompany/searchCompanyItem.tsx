import { Card, Text } from "@radix-ui/themes";
import styles from "./searchCompanyItem.module.scss";

import { useEffect, useRef } from "react";
import { useSearchCompany } from "@/store/search/useSearchCompany";

interface CompanyItemProps {
  name: string;
}

const CompanyItem = ({ name }: CompanyItemProps) => {
  const companyOpt = useSearchCompany((state) => state.searchCompanyMap[name]);

  const rootCard = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (companyOpt?.selected)
      rootCard.current?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [companyOpt]);

  return (
    <Card
      ref={rootCard}
      className={`${styles.container} ${
        companyOpt?.selected ? styles.selected : ""
      }`}
    >
      <Text className={styles.text}>{name}</Text>
    </Card>
  );
};

export default CompanyItem;
