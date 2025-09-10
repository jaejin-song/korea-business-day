
/**
 * 날짜 문자열을 한국 표준시(KST) Date 객체로 변환합니다
 * @param dateStr - 변환할 날짜 문자열 (YYYY-MM-DD 형식)
 * @returns 한국 표준시로 변환된 Date 객체
 */
export const toDate = (dateStr: string): Date => {
  const utc = new Date(`${dateStr}T00:00:00Z`); // UTC 자정
  const kstTime = utc.getTime() + 9 * 60 * 60 * 1000; // KST로 변환
  const kstDate = new Date(kstTime);

  return kstDate;
};

/**
 * Date 객체를 YYYY-MM-DD 형식의 날짜 문자열로 변환합니다
 * @param date - 변환할 Date 객체
 * @returns YYYY-MM-DD 형식의 날짜 문자열
 */
export const toDateString = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

/**
 * 주어진 날짜가 주말(토요일 또는 일요일)인지 판단합니다
 * @param date - 확인할 날짜 (YYYY-MM-DD 형식)
 * @returns 주말인 경우 true, 아니면 false (일요일: 0, 토요일: 6)
 */
export const isWeekend = (date: string): boolean => {
  const kstDate = toDate(date);
  const kstDay = kstDate.getUTCDay();
  const isWeekend = kstDay === 0 || kstDay === 6;

  return isWeekend;
};
