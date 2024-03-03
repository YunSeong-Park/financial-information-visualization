import { create } from "zustand";
import {
  SubjectAction,
  SubjectState,
  createSubjectStore,
} from "./subject/useSubject";
import { PeriodAction, PeriodState, createPeriodStore } from "./date/usePeriod";
import {
  SelectedAccountAction,
  SelectedAccountState,
  createSelectedAccountStore,
} from "./selectedAccount/selectedAccountStore";
import useCorpCode from "@/hooks/useCorpCode";
import { useEffect } from "react";

export const useVisualizationStore = create<
  SubjectState &
    SubjectAction &
    PeriodState &
    PeriodAction &
    SelectedAccountAction &
    SelectedAccountState
>((...a) => ({
  ...createSubjectStore(...a),
  ...createSelectedAccountStore(...a),
  ...createPeriodStore(...a),
}));

export const useResetSelectedAccounts = () => {
  const company = useCorpCode();
  const subject = useVisualizationStore((state) => state.subject);
  const reset = useVisualizationStore((state) => state.resetAccounts);

  useEffect(reset, [company, subject, reset]);
};
