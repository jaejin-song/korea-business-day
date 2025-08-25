import { describe, expect, it } from "vitest";
import { isHoliday, isTradingHoliday } from "./holiday";

describe("holiday", () => {
  describe("isHoliday", () => {
    it("공휴일을 정확히 인식해야 함", () => {
      expect(isHoliday("2025-01-01")).toEqual(true); // 신정
      expect(isHoliday("2025-03-03")).toEqual(true); // 삼일절(대체휴일)
      expect(isHoliday("2025-08-15")).toEqual(true); // 광복절
    });

    it("공휴일이 아닌 날을 정확히 인식해야 함", () => {
      expect(isHoliday("2025-08-25")).toEqual(false); // 평일
      expect(isHoliday("2025-08-24")).toEqual(false); // 주말
    });

    it("지원하지 않는 연도에 대해서는 false를 반환해야 함", () => {
      expect(isHoliday("2021-12-25")).toEqual(false); // 2021년 데이터 없음
    });
  });

  describe("isTradingHoliday", () => {
    it("거래소 휴무일을 정확히 인식해야 함", () => {
      expect(isTradingHoliday("2025-01-01")).toEqual(true); // 신정
      expect(isTradingHoliday("2025-08-15")).toEqual(true); // 광복절
      expect(isTradingHoliday("2025-12-31")).toEqual(true); // 연말휴장일
    });

    it("거래소 휴무일이 아닌 날을 정확히 인식해야 함", () => {
      expect(isTradingHoliday("2025-08-25")).toEqual(false); // 평일
      expect(isTradingHoliday("2025-08-24")).toEqual(false); // 주말
    });

    it("지원하지 않는 연도에 대해서는 false를 반환해야 함", () => {
      expect(isTradingHoliday("2021-12-31")).toEqual(false); // 2021년 데이터 없음
    });
  });

  describe("공휴일과 거래소 휴무일의 차이", () => {
    it("연말휴장일은 거래소 휴무일이지만 공휴일은 아님", () => {
      expect(isHoliday("2025-12-31")).toEqual(false); // 공휴일 아님
      expect(isTradingHoliday("2025-12-31")).toEqual(true); // 거래소 휴무일임
    });
  });
});