import useCorpCode from "@/hooks/useCorpCode";
import { getCompanyAccount } from "@/server/getCompanyAccount";
import { QueryClient, useQuery } from "@tanstack/react-query";

const getCompanyAccountQueryProps = (corp_code: string) => ({
  queryKey: ["accounts", corp_code],
  queryFn: async () => {
    const subjects = await getCompanyAccount(corp_code!);

    return subjects;
  },
});

const useCompanyAccountQuery = () => {
  const corp_code = useCorpCode();

  const accounts = useQuery(getCompanyAccountQueryProps(corp_code));

  return accounts;
};

export default useCompanyAccountQuery;

export const prefetchCompayAccount = async (
  client: QueryClient,
  corp_code: string
) => {
  await client.prefetchQuery(getCompanyAccountQueryProps(corp_code));
};
