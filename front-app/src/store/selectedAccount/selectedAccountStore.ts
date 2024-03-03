import { produce } from "immer";
import { StateCreator } from "zustand";
import { CompanyAccount } from "@/server/getCompanyAccount";

export type SelectedAccountState = {
  accounts: CompanyAccount[];
};
export type SelectedAccountAction = {
  setAccounts: (accounts: CompanyAccount[]) => void;
  toggleAccount: (account: CompanyAccount) => void;
  resetAccounts: () => void;
};

export const createSelectedAccountStore: StateCreator<
  SelectedAccountState & SelectedAccountAction
> = (set, get) => ({
  accounts: [],
  setAccounts: (accounts: CompanyAccount[]) => set({ accounts }),
  resetAccounts: () => set({ accounts: [] }),
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
});
