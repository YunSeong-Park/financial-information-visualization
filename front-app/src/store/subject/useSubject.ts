import { StateCreator } from "zustand";

export const ACCOUNT_SUBJECT = [
  "재무상태표",
  "손익계산서",
  "포괄손익계산서",
  "현금흐름표",
] as const;

type AccountSubject = (typeof ACCOUNT_SUBJECT)[number];

export type SubjectState = {
  subject: AccountSubject;
};

export type SubjectAction = {
  setSubject: (subject: AccountSubject) => void;
};

export const createSubjectStore: StateCreator<SubjectAction & SubjectState> = (
  set
) => {
  return {
    subject: ACCOUNT_SUBJECT[0],
    setSubject: (subject) => {
      set({ subject });
    },
  };
};
