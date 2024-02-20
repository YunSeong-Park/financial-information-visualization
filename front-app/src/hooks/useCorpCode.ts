import { useSearchParams } from "next/navigation";

const NoCorpError = new Error("corp_code가 유효하지 않습니다.");

const useCorpCode = () => {
  const corpCode = useSearchParams().get("corp_code");

  if (corpCode === null) {
    throw NoCorpError;
  }

  return corpCode;
};

export default useCorpCode;
