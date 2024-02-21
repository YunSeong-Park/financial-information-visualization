import { Heading, Flex, Text } from "@radix-ui/themes";

import style from "./page.module.scss";
import SearchTextField from "@/business-components/searchCompany/searchTextField";
import SearchCompanyList from "@/business-components/searchCompany/searchCompanyList";

const Home = async () => {
  return (
    <main className={style.root}>
      <Flex direction="column" className={style.container}>
        <Flex align="center" justify="center" direction="column">
          <Heading className={style.title}>회사 재무 분석</Heading>
          <Text className={style.subtitle}>
            분석하고자 하는 회사를 검색하세요.
          </Text>
        </Flex>
        <SearchTextField />

        <SearchCompanyList />
      </Flex>
    </main>
  );
};

export default Home;
