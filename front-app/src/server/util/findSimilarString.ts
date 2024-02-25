import memoizee from "memoizee";
import KoreaJamoUtil from "./koreaJamoUtil";

// 레벤슈타인 거리 계산 함수
const getLevenshteinDistance =
  (reference: string) =>
  (compared: string): number => {
    const matrix: number[][] = [];

    // 문자열 a의 각 문자에 대해
    for (let i = 0; i <= compared.length; i++) {
      matrix[i] = [i];
    }

    // 문자열 b의 각 문자에 대해
    for (let j = 0; j <= reference.length; j++) {
      matrix[0][j] = j;
    }

    // 거리 계산
    for (let i = 1; i <= compared.length; i++) {
      for (let j = 1; j <= reference.length; j++) {
        if (compared.charAt(i - 1) == reference.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
          );
        }
      }
    }

    return matrix[compared.length][reference.length];
  };

const findSimilarString = (list: string[], length: number = 5) => {
  const parsedList = list.map((item) => ({
    decomposed: KoreaJamoUtil.split(item).join("").toUpperCase(),
    origin: item,
  }));

  return (string: string) => {
    const decomposedString = KoreaJamoUtil.split(string).join("").toUpperCase();
    const levenshteinDistance = getLevenshteinDistance(decomposedString);

    const sorted = parsedList
      .map((item) => {
        const levenDistance = levenshteinDistance(item.decomposed);
        const adjDistance = item.decomposed.includes(decomposedString)
          ? -99
          : 0;

        return {
          ...item,
          distance: levenDistance + adjDistance,
        };
      })
      .sort((curr, next) => curr.distance - next.distance);

    return sorted.slice(0, length).map((item) => item.origin);
  };
};

export default memoizee(findSimilarString);
