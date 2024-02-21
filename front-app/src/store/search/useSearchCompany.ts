import { Company } from "@prisma/client";
import { produce } from "immer";
import { create } from "zustand";

type SearchCompanyItem = { name: string; selected: boolean; code: string };

export const useSearchCompany = create<{
  search: string;
  setSearch: (search: string) => void;
  moveUp: () => void;
  moveDown: () => void;
  setCurrentCompany: (company: string) => void;
  searchCompanyMap: Record<string, SearchCompanyItem>;
  setSearchCompanyMap: (companyList?: Company[]) => void;
  getCurrentCompany: () => SearchCompanyItem;
}>((set, get) => {
  let currentCompany: string;

  const changeCurrentCompany = (getNextCompany: () => string) => () => {
    if (!currentCompany) {
      throw Error(
        "currentCompany가 없습니다. searchCompanyMap을 설정한 후 upIndex를 실행하세요."
      );
    }

    const nextComapny = getNextCompany();

    const searchCompanyMap = get().searchCompanyMap;
    if (!searchCompanyMap.hasOwnProperty(nextComapny)) {
      throw Error(`${nextComapny} 는 searchCompanyMap에 존재하지 않습니다.`);
    }

    if (currentCompany === nextComapny) {
      return;
    }

    const newSearchCompanyMap = produce(searchCompanyMap, (draft) => {
      draft[currentCompany].selected = false;
      draft[nextComapny].selected = true;
    });
    set({ searchCompanyMap: newSearchCompanyMap });
    currentCompany = nextComapny;
  };

  return {
    search: "",
    setSearch: (search: string) => set({ search }),
    searchCompanyMap: {},
    setSearchCompanyMap: (companyList?: Company[]) => {
      if (!companyList || companyList.length === 0) {
        return;
      }
      currentCompany = companyList[0].corp_name;

      const searchCompanyMap: Record<string, SearchCompanyItem> = {};

      companyList.forEach((company, i) => {
        searchCompanyMap[company.corp_name] = {
          selected: i ? false : true,
          name: company.corp_name,
          code: company.corp_code,
        };
      });

      set({ searchCompanyMap });
    },
    moveDown: changeCurrentCompany(() => {
      const searchCompanyMap = get().searchCompanyMap;
      const companyList = Object.keys(searchCompanyMap);
      const index = companyList.indexOf(currentCompany);

      const nextComapny =
        companyList[Math.min(index + 1, companyList.length - 1)];
      return nextComapny;
    }),
    moveUp: changeCurrentCompany(() => {
      const searchCompanyMap = get().searchCompanyMap;

      const companyList = Object.keys(searchCompanyMap);

      const index = companyList.indexOf(currentCompany);
      const nextComapny = companyList[Math.max(index - 1, 0)];
      return nextComapny;
    }),
    setCurrentCompany: (company) => {
      changeCurrentCompany(() => company)();
    },
    getCurrentCompany: () => {
      const searchCompanyMap = get().searchCompanyMap;

      if (!searchCompanyMap.hasOwnProperty(currentCompany)) {
        throw Error(
          `${currentCompany}는 searchCompanyMap에 존재하지 않습니다.`
        );
      }

      return get().searchCompanyMap[currentCompany];
    },
  };
});
