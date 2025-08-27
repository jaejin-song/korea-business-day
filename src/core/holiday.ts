import type { DateString } from "../types.ts";
import { holidaysByYear, tradingHolidaysByYear } from "../holidays/index.ts";

/**
 * 주어진 날짜가 한국의 공휴일인지 판단합니다
 * @param date - 확인할 날짜 (YYYY-MM-DD 형식)
 * @returns 공휴일인 경우 true, 아니면 false
 * @example
 * isHoliday('2024-01-01'); // true (신정)
 * isHoliday('2024-01-02'); // false (평일)
 */
export const isHoliday = (date: DateString): boolean => {
  const year = date.split("-")[0];
  return holidaysByYear[year]?.includes(date) ?? false;
};

/**
 * 주어진 날짜가 한국 주식시장 휴무일인지 판단합니다
 * @param date - 확인할 날짜 (YYYY-MM-DD 형식)
 * @returns 거래소 휴무일인 경우 true, 아니면 false
 * @example
 * isTradingHoliday('2024-01-01'); // true (신정, 거래소 휴무)
 * isTradingHoliday('2024-01-02'); // false (정상 거래일)
 */
export const isTradingHoliday = (date: DateString): boolean => {
  const year = date.split("-")[0];
  return tradingHolidaysByYear[year]?.includes(date) ?? false;
};
