import type { DateString } from "../types";
import { toDate, toDateString, isWeekend } from "./date-utils";
import { isHoliday, isTradingHoliday } from "./holiday";

/**
 * 주어진 날짜가 영업일인지 판단합니다 (주말 및 공휴일 제외)
 * @param date - 확인할 날짜 (YYYY-MM-DD 형식)
 * @returns 영업일인 경우 true, 아니면 false
 * @example
 * isBusinessDay('2024-01-02'); // true (화요일, 평일)
 * isBusinessDay('2024-01-01'); // false (신정, 공휴일)
 * isBusinessDay('2024-01-06'); // false (토요일, 주말)
 */
export const isBusinessDay = (date: DateString): boolean => {
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
export const nextBusinessDay = (date: DateString): DateString => {
  let d = toDate(date);
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
export const previousBusinessDay = (date: DateString): DateString => {
  let d = toDate(date);
  d.setUTCDate(d.getUTCDate() - 1);

  while (!isBusinessDay(toDateString(d))) {
    d.setUTCDate(d.getUTCDate() - 1);
  }

  return toDateString(d);
};

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
export const isTradingDay = (date: DateString): boolean => {
  return !isWeekend(date) && !isTradingHoliday(date);
};

/**
 * 주어진 날짜 다음의 첫 번째 주식시장 개장일을 반환합니다
 * @param date - 기준 날짜 (YYYY-MM-DD 형식)
 * @returns 다음 개장일 날짜 (YYYY-MM-DD 형식)
 * @example
 * nextTradingDay('2024-01-01'); // '2024-01-02' (신정 다음 개장일)
 * nextTradingDay('2024-12-29'); // '2025-01-02' (연말특별휴무 다음 개장일)
 * nextTradingDay('2024-05-03'); // '2024-05-07' (어린이날 연휴 다음 개장일)
 */
export const nextTradingDay = (date: DateString): DateString => {
  let d = toDate(date);
  d.setUTCDate(d.getUTCDate() + 1);

  while (!isTradingDay(toDateString(d))) {
    d.setUTCDate(d.getUTCDate() + 1);
  }

  return toDateString(d);
};

/**
 * 주어진 날짜 이전의 첫 번째 주식시장 개장일을 반환합니다
 * @param date - 기준 날짜 (YYYY-MM-DD 형식)
 * @returns 이전 개장일 날짜 (YYYY-MM-DD 형식)
 * @example
 * previousTradingDay('2024-01-02'); // '2023-12-29' (신정 이전 개장일)
 * previousTradingDay('2025-01-02'); // '2024-12-29' (연말 이전 개장일)
 * previousTradingDay('2024-05-07'); // '2024-05-02' (어린이날 연휴 이전 개장일)
 */
export const previousTradingDay = (date: DateString): DateString => {
  let d = toDate(date);
  d.setUTCDate(d.getUTCDate() - 1);

  while (!isTradingDay(toDateString(d))) {
    d.setUTCDate(d.getUTCDate() - 1);
  }

  return toDateString(d);
};
