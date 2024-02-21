import useCorpCode from "@/hooks/useCorpCode";
import { getCompany } from "@/server/getCompany";

import { QueryClient, useQuery } from "@tanstack/react-query";

const useCompanyQuery = () => {
  const corp_code = useCorpCode();

  return useQuery({
    queryKey: ["company", corp_code],
    queryFn: () => getCompany(corp_code!),
    enabled: !!corp_code,
  });
};

export default useCompanyQuery;

export const prefetchCompany = (client: QueryClient, corp_code: string) => {
  client.prefetchQuery({
    queryKey: ["company", corp_code],
    queryFn: () => getCompany(corp_code),
  });
};
