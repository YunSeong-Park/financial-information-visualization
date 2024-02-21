import useCorpCode from "@/hooks/useCorpCode";
import { getFnData } from "@/server/getFnData/getFnData";
import {
  PeriodDateConstructor,
  PeriodDatePlainObj,
} from "@/store/date/customDate";
import { usePeriod } from "@/store/date/usePeriod";

import useSelectedAccountStore from "@/store/selectedAccount/selectedAccountStore";
import { useQuery } from "@tanstack/react-query";

const useFnDataQuery = () => {
  const corp_code = useCorpCode();
  const period = usePeriod((state) => state.period.period);
  const periodType = usePeriod((state) => state.period.type);
  const accounts = useSelectedAccountStore((state) => state.accounts);

  return useQuery({
    queryKey: ["vis", corp_code, period, accounts, periodType],
    queryFn: () =>
      getFnData({
        periodType: periodType as any,
        corp_code: corp_code!,
        period: period.map((date) => date.toPlain()) as any,
        accounts,
      }),
    enabled: corp_code !== null && accounts.length > 0,
    placeholderData: (prevData, prevQuery) => {
      if (accounts.length === 0) {
        return;
      }
      return prevData;
    },
  });
};
export default useFnDataQuery;

export const convertFnData2Table = (
  data: {
    date: PeriodDatePlainObj;
    accounts: { account_name: string; account_value: number }[];
  }[]
) => {
  const accountNameSet = new Set<string>();

  data.forEach((timeSeries) => {
    timeSeries.accounts.forEach((account) =>
      accountNameSet.add(account.account_name)
    );
  });

  return data.map((rowData) => {
    const row: Record<string, string | number> = {};

    const date = PeriodDateConstructor(rowData.date);
    row.date = date.toString();

    accountNameSet.forEach((accountName) => {
      row[accountName] = 0;
    });

    rowData.accounts.forEach((account) => {
      row[account.account_name] = account.account_value;
    });

    return row;
  });
};
