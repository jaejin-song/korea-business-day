import { toDate, toDateString, isWeekend } from "./date-utils.ts";
import { isHoliday } from "./holiday.ts";

/**
 * 주어진 날짜가 영업일인지 판단합니다 (주말 및 공휴일 제외)
 * @param date - 확인할 날짜 (YYYY-MM-DD 형식)
 * @returns 영업일인 경우 true, 아니면 false
 * @example
 * isBusinessDay('2024-01-02'); // true (화요일, 평일)
 * isBusinessDay('2024-01-01'); // false (신정, 공휴일)
 * isBusinessDay('2024-01-06'); // false (토요일, 주말)
 */
export const isBusinessDay = (date: string): boolean => {
  return !isWeekend(date) && !isHoliday(date);
};

/**
 * 주어진 날짜 다음의 첫 번째 영업일을 반환합니다
 * @param date - 기준 날짜 (YYYY-MM-DD 형식)
 * @returns 다음 영업일 날짜 (YYYY-MM-DD 형식)
 * @example
 * nextBusinessDay('2024-01-01'); // '2024-01-02' (신정 다음 영업일)
 * nextBusinessDay('2024-01-05'); // '2024-01-08' (금요일 다음 영업일은 월요일)
 * nextBusinessDay('2024-12-31'); // '2025-01-02' (연말연시 다음 영업일)
 */
export const nextBusinessDay = (date: string): string => {
  const d = toDate(date);
  d.setUTCDate(d.getUTCDate() + 1);

  while (!isBusinessDay(toDateString(d))) {
    d.setUTCDate(d.getUTCDate() + 1);
  }

  return toDateString(d);
};

/**
 * 주어진 날짜 이전의 첫 번째 영업일을 반환합니다
 * @param date - 기준 날짜 (YYYY-MM-DD 형식)
 * @returns 이전 영업일 날짜 (YYYY-MM-DD 형식)
 * @example
 * previousBusinessDay('2024-01-02'); // '2023-12-29' (신정 이전 영업일)
 * previousBusinessDay('2024-01-08'); // '2024-01-05' (월요일 이전 영업일은 금요일)
 * previousBusinessDay('2024-03-02'); // '2024-02-29' (3월 1일 삼일절 이전 영업일)
 */
export const previousBusinessDay = (date: string): string => {
  const d = toDate(date);
  d.setUTCDate(d.getUTCDate() - 1);

  while (!isBusinessDay(toDateString(d))) {
    d.setUTCDate(d.getUTCDate() - 1);
  }

  return toDateString(d);
};
