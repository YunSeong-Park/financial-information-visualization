class KoreaJamoUtil {
  static CHOSUNG = [
    "ㄱ",
    "ㄲ",
    "ㄴ",
    "ㄷ",
    "ㄸ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅃ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅉ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ] as const;
  static JUNGSUNG = [
    "ㅏ",
    "ㅐ",
    "ㅑ",
    "ㅒ",
    "ㅓ",
    "ㅔ",
    "ㅕ",
    "ㅖ",
    "ㅗ",
    "ㅘ",
    "ㅙ",
    "ㅚ",
    "ㅛ",
    "ㅜ",
    "ㅝ",
    "ㅞ",
    "ㅟ",
    "ㅠ",
    "ㅡ",
    "ㅢ",
    "ㅣ",
  ] as const;
  static JONGSUNG = [
    "",
    "ㄱ",
    "ㄲ",
    "ᆪ",
    "ᆫ",
    "ᆬ",
    "ᆭ",
    "ㄷ",
    "ㄹ",
    "ᆰ",
    "ᆱ",
    "ᆲ",
    "ᆳ",
    "ᆴ",
    "ᆵ",
    "ᆶ",
    "ㅁ",
    "ㅂ",
    "ᆹ",
    "ᆺ",
    "ᆻ",
    "ᆼ",
    "ᆽ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ] as const;

  static HANGUL_BASE = 0xac00 as const;
  static HANGUL_END = 0xd7a3 as const;

  private static _splitOne(target: string) {
    const startValue = target.charCodeAt(0) - KoreaJamoUtil.HANGUL_BASE;
    const jong = startValue % 28;
    const jung = ((startValue - jong) / 28) % 21;
    const cho = ((startValue - jong) / 28 - jung) / 21;

    return [
      KoreaJamoUtil.CHOSUNG[cho],
      KoreaJamoUtil.JUNGSUNG[jung],
      KoreaJamoUtil.JONGSUNG[jong],
    ];
  }

  static splitOne(target: string) {
    if (target.length !== 1) throw Error(`${target}은 한글자가 아닙니다.`);

    if (!KoreaJamoUtil.isKRJamo(target))
      throw Error(`${target}은 한글 Jamo가 아닙니다.`);

    return KoreaJamoUtil._splitOne(target);
  }

  static split(target: string) {
    return target.split("").flatMap((element) => {
      if (KoreaJamoUtil.isKRJamo(element)) {
        return KoreaJamoUtil.splitOne(element);
      }

      return [element];
    });
  }

  static isKRJamo(target: string) {
    const targetCode = target.charCodeAt(0);

    return (
      targetCode >= KoreaJamoUtil.HANGUL_BASE &&
      targetCode <= KoreaJamoUtil.HANGUL_END
    );
  }
}
export default KoreaJamoUtil;
