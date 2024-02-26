import { produce } from "immer";
import { useEffect, useRef } from "react";
import { create } from "zustand";
import { useSubjectStore } from "../subject/useSubject";
import useCorpCode from "@/hooks/useCorpCode";
import { CompanyAccount } from "@/server/getCompanyAccount";
import { createJSONStorage, persist } from "zustand/middleware";
import hashStorage from "../hashStorage/hashStorage";

type SelectedAccountState = {
  accounts: CompanyAccount[];
  setAccounts: (accounts: CompanyAccount[]) => void;
  toggleAccount: (account: CompanyAccount) => void;
  reset: () => void;
};

const useSelectedAccountStore = create<SelectedAccountState>()(
  persist(
    (set, get) => ({
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
    }),
    {
      name: "selectedAccountStore", //
      storage: createJSONStorage(() => hashStorage),
    }
  )
);

export const useResetSelectedAcount = () => {
  const company = useCorpCode();
  const subject = useSubjectStore((state) => state.subject);
  const reset = useSelectedAccountStore((state) => state.reset);
  const isInit = useRef(true);

  useEffect(() => {
    if (!isInit.current) reset();

    isInit.current = false;
  }, [company, subject, reset]);
};

export default useSelectedAccountStore;
