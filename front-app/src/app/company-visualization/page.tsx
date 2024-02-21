import VisChart from "@/business-components/companyVis/visChart";
import Redirection from "@/business-components/redirection/redirection";
import PeriodUnitSelect from "@/business-components/periodUnitSelect/periodUnitSelect";

import { Flex, Heading } from "@radix-ui/themes";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import AccountSubjectSelect from "@/business-components/accountSubjectSelect/accountSubjectSelect";
import { prefetchCompayAccount } from "@/query/useCompanyAccountQuery";
import AccountList from "@/business-components/accountList/accountList";
import DateRangeSelect from "@/business-components/dateRangeSelect/dateRangeSelect";
import styles from "./page.module.scss";

import FnDataDownloadBtn from "@/business-components/fnDataDownloadBtn/fnDataDownloadBtn";
import { prefetchCompany } from "@/query/useCompanyQuery";

type CompanyVisualizationSearchParams = {
  corp_code?: string;
};

interface CompanyVisualizationProps {
  searchParams: CompanyVisualizationSearchParams;
}

const CompanyVisualization = async ({
  searchParams: { corp_code },
}: CompanyVisualizationProps) => {
  if (corp_code === undefined) {
    return <Redirection />;
  }

  const queryClient = new QueryClient();

  await Promise.all([
    prefetchCompany(queryClient, corp_code),
    prefetchCompayAccount(queryClient, corp_code),
  ]);

  const company = queryClient.getQueriesData<{ corp_name: string }>({
    queryKey: ["company", corp_code],
  });

  if (!company[0][1]?.corp_name) {
    return <Redirection />;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Flex direction="column" className={styles.container}>
        <Heading className={styles.main_title}>
          {company[0][1].corp_name} 재무제표
        </Heading>
        <div className={styles.card_container}>
          <div className={`${styles.card} ${styles.period_contents_container}`}>
            <Flex
              direction="column"
              className={`${styles.period_controller} ${styles.sub_contents_container}`}
            >
              <Heading className={styles.subtitle}>기간 단위</Heading>
              <PeriodUnitSelect />
            </Flex>
            <Flex
              direction="column"
              className={`${styles.period_controller} ${styles.sub_contents_container}`}
            >
              <Heading className={styles.subtitle}>기간</Heading>
              <DateRangeSelect />
            </Flex>
          </div>
        </div>
        <div
          className={`${styles.main_contents_container} ${styles.max_container} ${styles.card_container}`}
        >
          <Flex
            direction="column"
            className={`${styles.card} ${styles.max_container} ${styles.account_card}`}
          >
            <Flex direction="column" className={styles.sub_contents_container}>
              <Heading className={styles.subtitle}>재무제표</Heading>
              <AccountSubjectSelect />
            </Flex>
            <Flex
              direction="column"
              className={`${styles.sub_contents_container} ${styles.max_container}`}
            >
              <Heading className={styles.subtitle}>계정</Heading>
              <div className={styles.max_container}>
                <AccountList />
              </div>
            </Flex>
          </Flex>
          <Flex
            direction="column"
            className={`${styles.card} ${styles.vis_card}`}
          >
            <Flex align="center" justify="between">
              <Heading className={styles.subtitle}>재무제표 차트</Heading>
              <FnDataDownloadBtn />
            </Flex>
            <VisChart />
          </Flex>
        </div>
      </Flex>
    </HydrationBoundary>
  );
};

export default CompanyVisualization;
