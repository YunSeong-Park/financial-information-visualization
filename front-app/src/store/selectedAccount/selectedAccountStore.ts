import { produce } from "immer";
import { useEffect } from "react";
import { create } from "zustand";
import { useSubjectStore } from "../subject/useSubject";
import useCorpCode from "@/hooks/useCorpCode";
import { CompanyAccount } from "@/server/getCompanyAccount";

const useSelectedAccountStore = create<{
  accounts: CompanyAccount[];
  setAccounts: (accounts: CompanyAccount[]) => void;
  toggleAccount: (account: CompanyAccount) => void;
  reset: () => void;
}>((set, get) => ({
  accounts: [],
  setAccounts: (accounts: CompanyAccount[]) => set({ accounts }),
  reset: () => set({ accounts: [] }),
  toggleAccount: (account) => {
    const accounts = produce(get().accounts, (draft) => {
      const idx = draft.findIndex(
        (item) => item.account_name === account.account_name
      );
      if (idx === -1) {
        draft.push({ ...account });
      } else {
        draft.splice(idx, 1);
      }
    });
    set({ accounts });
  },
}));

export const useResetSelectedAcount = () => {
  const company = useCorpCode();
  const subject = useSubjectStore((state) => state.subject);
  const reset = useSelectedAccountStore((state) => state.reset);

  useEffect(reset, [company, subject, reset]);
};

export default useSelectedAccountStore;
