"use client";

import useCompanyAccountQuery from "@/query/useCompanyAccountQuery";
import useSelectedAccountStore, {
  useResetSelectedAcount,
} from "@/store/selectedAccount/selectedAccountStore";
import { useSubjectStore } from "@/store/subject/useSubject";
import { Text, Flex, Checkbox } from "@radix-ui/themes";
import styles from "./accountList.module.scss";

const AccountList = () => {
  const account = useCompanyAccountQuery();
  const subject = useSubjectStore();
  const selected = useSelectedAccountStore();

  useResetSelectedAcount();

  const accounts = account.data?.find(
    (account) => account.sj_name === subject.subject
  );

  return (
    <div>
      {accounts?.accounts.map((account) => (
        <Text as="label" key={account.account_id}>
          <Flex gap="2" align="center">
            <Checkbox
              onClick={() => {
                selected.toggleAccount(account);
              }}
              checked={selected.accounts.includes(account)}
            />
            <span className={styles.account_label}>{account.account_name}</span>
          </Flex>
        </Text>
      ))}
    </div>
  );
};

export default AccountList;
