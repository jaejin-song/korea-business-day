import { describe, expect, it } from "vitest";
import { isTradingDay, nextTradingDay, previousTradingDay } from "./trading.ts";

describe("trading", () => {
  describe("isTradingDay", () => {
    it("주말은 거래일이 아니어야 함", () => {
      expect(isTradingDay("2025-08-24")).toEqual(false); // 일요일
      expect(isTradingDay("2025-08-23")).toEqual(false); // 토요일
    });

    it("거래소 휴무일은 거래일이 아니어야 함", () => {
      expect(isTradingDay("2025-01-01")).toEqual(false); // 신정
      expect(isTradingDay("2025-12-31")).toEqual(false); // 연말휴장일
      expect(isTradingDay("2025-08-15")).toEqual(false); // 광복절
    });

    it("평일이고 거래소 휴무일이 아니면 거래일이어야 함", () => {
      expect(isTradingDay("2025-08-25")).toEqual(true); // 월요일
      expect(isTradingDay("2025-08-26")).toEqual(true); // 화요일
      expect(isTradingDay("2025-08-27")).toEqual(true); // 수요일
      expect(isTradingDay("2025-08-28")).toEqual(true); // 목요일
      expect(isTradingDay("2025-08-29")).toEqual(true); // 금요일
    });
  });

  describe("nextTradingDay", () => {
    it("평일의 다음 거래일은 다음 날이어야 함", () => {
      expect(nextTradingDay("2025-08-25")).toEqual("2025-08-26"); // 월요일 → 화요일
      expect(nextTradingDay("2025-08-26")).toEqual("2025-08-27"); // 화요일 → 수요일
    });

    it("금요일의 다음 거래일은 월요일이어야 함", () => {
      expect(nextTradingDay("2025-08-29")).toEqual("2025-09-01"); // 금요일 → 월요일
    });

    it("주말의 다음 거래일은 월요일이어야 함", () => {
      expect(nextTradingDay("2025-08-23")).toEqual("2025-08-25"); // 토요일 → 월요일
      expect(nextTradingDay("2025-08-24")).toEqual("2025-08-25"); // 일요일 → 월요일
    });

    it("거래소 휴무일 다음의 첫 번째 거래일을 반환해야 함", () => {
      expect(nextTradingDay("2025-01-01")).toEqual("2025-01-02"); // 신정(수) → 목요일
      expect(nextTradingDay("2025-08-15")).toEqual("2025-08-18"); // 광복절(금) → 월요일
    });

    it("연말 휴장 이후의 다음 거래일을 정확히 계산해야 함", () => {
      expect(nextTradingDay("2025-12-31")).toEqual("2026-01-02"); // 연말휴장일 → 신정 다음 거래일
    });

    it("연휴 기간의 다음 거래일을 정확히 계산해야 함", () => {
      expect(nextTradingDay("2025-01-27")).toEqual("2025-01-31"); // 임시공휴일 → 설 연휴 후 첫 거래일
    });
  });

  describe("previousTradingDay", () => {
    it("평일의 이전 거래일은 전날이어야 함", () => {
      expect(previousTradingDay("2025-08-26")).toEqual("2025-08-25"); // 화요일 → 월요일
      expect(previousTradingDay("2025-08-27")).toEqual("2025-08-26"); // 수요일 → 화요일
    });

    it("월요일의 이전 거래일은 금요일이어야 함", () => {
      expect(previousTradingDay("2025-08-25")).toEqual("2025-08-22"); // 월요일 → 금요일
    });

    it("주말의 이전 거래일은 금요일이어야 함", () => {
      expect(previousTradingDay("2025-08-23")).toEqual("2025-08-22"); // 토요일 → 금요일
      expect(previousTradingDay("2025-08-24")).toEqual("2025-08-22"); // 일요일 → 금요일
    });

    it("거래소 휴무일 이전의 마지막 거래일을 반환해야 함", () => {
      expect(previousTradingDay("2025-01-01")).toEqual("2024-12-30"); // 신정 → 월요일 (2024-12-31은 화요일이지만 연말휴장일)
      expect(previousTradingDay("2025-08-15")).toEqual("2025-08-14"); // 광복절 → 목요일
    });

    it("연말 휴장 이전의 마지막 거래일을 정확히 계산해야 함", () => {
      expect(previousTradingDay("2025-12-31")).toEqual("2025-12-30"); // 연말휴장일 → 월요일
    });

    it("연휴 기간의 이전 거래일을 정확히 계산해야 함", () => {
      expect(previousTradingDay("2025-01-28")).toEqual("2025-01-24"); // 설날 → 금요일
    });
  });

  describe("edge cases", () => {
    it("년도 경계를 넘나드는 경우를 처리해야 함", () => {
      // 거래일 기준
      expect(nextTradingDay("2024-12-31")).toEqual("2025-01-02"); // 연말휴장일 → 목요일
      expect(previousTradingDay("2025-01-02")).toEqual("2024-12-30"); // 목요일 → 월요일
    });

    it("대체휴일이 적용된 공휴일을 정확히 처리해야 함", () => {
      expect(isTradingDay("2025-03-03")).toEqual(false); // 삼일절 대체휴일(월요일)
      expect(nextTradingDay("2025-03-01")).toEqual("2025-03-04"); // 삼일절(토) → 화요일
    });
  });
});
