"use client";
import useCompanyAccountQuery from "@/query/useCompanyAccountQuery";

import { ACCOUNT_SUBJECT, useSubjectStore } from "@/store/subject/useSubject";
import { Select } from "@radix-ui/themes";

const AccountSubjectSelect = () => {
  const accounts = useCompanyAccountQuery();

  const subject = useSubjectStore();

  const sjSet = accounts.data?.reduce((acc, account) => {
    acc.add(account.sj_name);
    return acc;
  }, new Set());

  return (
    <Select.Root
      value={subject.subject}
      onValueChange={(value: any) => subject.setSubject(value)}
    >
      <Select.Trigger />
      <Select.Content>
        {ACCOUNT_SUBJECT.map((sub) => {
          return (
            <Select.Item key={sub} value={sub} disabled={!sjSet?.has(sub)}>
              {sub}
            </Select.Item>
          );
        })}
      </Select.Content>
    </Select.Root>
  );
};

export default AccountSubjectSelect;
