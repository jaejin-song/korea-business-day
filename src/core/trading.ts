import { toDate, toDateString, isWeekend } from "./date-utils.ts";
import { isTradingHoliday } from "./holiday.ts";

/**
 * 주어진 날짜가 한국 주식시장 개장일인지 판단합니다 (주말 및 거래소 휴무일 제외)
 * @param date - 확인할 날짜 (YYYY-MM-DD 형식)
 * @returns 개장일인 경우 true, 아니면 false
 * @example
 * isTradingDay('2024-01-02'); // true (화요일, 개장일)
 * isTradingDay('2024-01-01'); // false (신정, 거래소 휴무)
 * isTradingDay('2024-12-31'); // false (연말 특별휴무일)
 * isTradingDay('2024-01-06'); // false (토요일, 주말)
 */
export const isTradingDay = (date: string): boolean => {
  return !isWeekend(date) && !isTradingHoliday(date);
};

/**
 * 주어진 날짜 다음의 N번째 주식시장 개장일을 반환합니다
 * @param date - 기준 날짜 (YYYY-MM-DD 형식)
 * @param count - 몇 번째 개장일인지 (기본값: 1)
 * @returns N번째 다음 개장일 날짜 (YYYY-MM-DD 형식)
 * @example
 * nextTradingDay('2024-01-01'); // '2024-01-02' (신정 다음 첫 번째 개장일)
 * nextTradingDay('2024-01-01', 2); // '2024-01-03' (신정 다음 두 번째 개장일)
 * nextTradingDay('2024-12-29', 3); // '2025-01-06' (연말특별휴무 다음 세 번째 개장일)
 * nextTradingDay('2024-05-03', 5); // '2024-05-13' (어린이날 연휴 다음 다섯 번째 개장일)
 */
export const nextTradingDay = (date: string, count: number = 1): string => {
  if (count <= 0) {
    throw new Error('count must be a positive number');
  }

  const d = toDate(date);
  let foundCount = 0;

  // 다음 날부터 시작
  d.setUTCDate(d.getUTCDate() + 1);

  while (foundCount < count) {
    if (isTradingDay(toDateString(d))) {
      foundCount++;
    }
    
    if (foundCount < count) {
      d.setUTCDate(d.getUTCDate() + 1);
    }
  }

  return toDateString(d);
};

/**
 * 주어진 날짜 이전의 N번째 주식시장 개장일을 반환합니다
 * @param date - 기준 날짜 (YYYY-MM-DD 형식)
 * @param count - 몇 번째 개장일인지 (기본값: 1)
 * @returns N번째 이전 개장일 날짜 (YYYY-MM-DD 형식)
 * @example
 * previousTradingDay('2024-01-02'); // '2023-12-29' (신정 이전 첫 번째 개장일)
 * previousTradingDay('2024-01-08', 2); // '2024-01-04' (월요일 이전 두 번째 개장일)
 * previousTradingDay('2025-01-06', 3); // '2024-12-27' (연말 이전 세 번째 개장일)
 * previousTradingDay('2024-05-07', 5); // '2024-04-30' (어린이날 연휴 이전 다섯 번째 개장일)
 */
export const previousTradingDay = (date: string, count: number = 1): string => {
  if (count <= 0) {
    throw new Error('count must be a positive number');
  }

  const d = toDate(date);
  let foundCount = 0;

  // 이전 날부터 시작
  d.setUTCDate(d.getUTCDate() - 1);

  while (foundCount < count) {
    if (isTradingDay(toDateString(d))) {
      foundCount++;
    }
    
    if (foundCount < count) {
      d.setUTCDate(d.getUTCDate() - 1);
    }
  }

  return toDateString(d);
};
