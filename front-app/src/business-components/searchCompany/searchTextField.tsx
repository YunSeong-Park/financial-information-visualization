"use client";
import { useSearchCompany } from "@/store/search/useSearchCompany";
import { TextField } from "@radix-ui/themes";

import { useEffect, useRef, KeyboardEvent } from "react";

const SearchTextField = () => {
  const search = useSearchCompany((state) => state.search);
  const setSearch = useSearchCompany((state) => state.setSearch);
  const inputEl = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputEl.current?.focus();
  }, []);
  return (
    <TextField.Root>
      <TextField.Input
        ref={inputEl}
        value={search}
        onChange={(e: any) => setSearch(e.target.value)}
        placeholder="회사명을 입력해주세요."
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          if (["ArrowDown", "ArrowUp"].includes(e.key)) {
            e.preventDefault();
          }
        }}
      />
    </TextField.Root>
  );
};
export default SearchTextField;
