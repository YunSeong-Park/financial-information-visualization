"use client";

import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import styles from "./searchCompanyList.module.scss";
import CompanyItem from "./searchCompanyItem";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useCorpCode from "@/hooks/useCorpCode";
import { useSearchCompany } from "@/store/search/useSearchCompany";
import { searchCompanyList } from "@/server/searchCompanyList";

const SearchCompanyList = () => {
  const search = useSearchCompany((state) => state.search);
  const moveDown = useSearchCompany((state) => state.moveDown);
  const moveUp = useSearchCompany((state) => state.moveUp);
  const setSearchCompanyMap = useSearchCompany(
    (state) => state.setSearchCompanyMap
  );
  const setCurrentCompany = useSearchCompany(
    (state) => state.setCurrentCompany
  );
  const getCurrentCompany = useSearchCompany(
    (state) => state.getCurrentCompany
  );

  const router = useRouter();

  const query = useQuery({
    queryKey: ["searchCompany", search],
    queryFn: () => searchCompanyList(search),
    staleTime: 3_600_000,
    enabled: !!search,
    placeholderData: (prevData, prevQuery) => {
      if (!search) return [];

      return prevData;
    },
  });

  useEffect(() => {
    setSearchCompanyMap(query.data);
  }, [query.data]);

  useEffect(() => {
    const indexHandler = (e: KeyboardEvent) => {
      // chrome compose 시 key Down/Up
      if (e.isComposing) {
        return;
      }

      if (e.key === "ArrowDown") {
        moveDown();
      }

      if (e.key === "ArrowUp") {
        moveUp();
      }
    };

    window.addEventListener("keydown", indexHandler);
    return () => window.removeEventListener("keydown", indexHandler);
  }, [moveDown, moveUp]);

  useEffect(() => {
    const moveCompanyAnalysis = (e: KeyboardEvent) => {
      if (e.code !== "Enter") {
        return;
      }
      router.push(
        `company-visualization?corp_code=${getCurrentCompany().code}`
      );
    };

    addEventListener("keydown", moveCompanyAnalysis);

    return () => {
      removeEventListener("keydown", moveCompanyAnalysis);
    };
  }, [getCurrentCompany]);

  return (
    <Flex direction="column" className={styles.container}>
      {query.data?.map((company, i) => (
        <Link
          href={`company-visualization?corp_code=${company.corp_code}`}
          key={company.corp_code}
          onMouseDown={(e) => {
            setCurrentCompany(company.corp_name);
          }}
        >
          <CompanyItem name={company.corp_name} />
        </Link>
      ))}
    </Flex>
  );
};
export default SearchCompanyList;
