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
        placeholder="Search for a company"
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
