"use client";

import useCompanyAccountQuery from "@/query/useCompanyAccountQuery";

import { Text, Flex, Checkbox } from "@radix-ui/themes";
import styles from "./accountList.module.scss";
import {
  useResetSelectedAccounts,
  useVisualizationStore,
} from "@/store/visualizationStore";

const AccountList = () => {
  const account = useCompanyAccountQuery();
  const visStore = useVisualizationStore();

  useResetSelectedAccounts();

  const accounts = account.data?.find(
    (account) => account.sj_name === visStore.subject
  );

  return (
    <div>
      {accounts?.accounts.map((account) => (
        <Text as="label" key={account.account_name}>
          <Flex gap="2" align="center">
            <Checkbox
              onClick={() => {
                visStore.toggleAccount(account);
              }}
              checked={visStore.accounts.some(
                (item) => item.account_name === account.account_name
              )}
            />
            <span className={styles.account_label}>{account.account_name}</span>
          </Flex>
        </Text>
      ))}
    </div>
  );
};

export default AccountList;
