"use client";
import useCompanyAccountQuery from "@/query/useCompanyAccountQuery";

import { ACCOUNT_SUBJECT } from "@/store/subject/useSubject";
import { useVisualizationStore } from "@/store/visualizationStore";
import { Select } from "@radix-ui/themes";

const AccountSubjectSelect = () => {
  const accounts = useCompanyAccountQuery();

  const subject = useVisualizationStore((state) => state.subject);
  const setSubject = useVisualizationStore((state) => state.setSubject);

  const sjSet = accounts.data?.reduce((acc, account) => {
    acc.add(account.sj_name);
    return acc;
  }, new Set());

  return (
    <Select.Root
      value={subject}
      onValueChange={(value: any) => setSubject(value)}
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
