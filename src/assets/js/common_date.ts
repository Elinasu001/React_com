/**
 * @fileoverview 이 파일은 폼 유요성 검사 함수 모음
 *
 * @author 
 * @version 1.0.0
 */

/**
 * 현재 시간을 지정한 패턴에 맞춰 포맷팅하여 반환합니다.
 * 지원 토큰: 
 *   - YYYY: 4자리 연도
 *   - MM: 2자리 월 (01~12)
 *   - DD: 2자리 일 (01~31)
 *   - hh: 2자리 시간 (00~23)
 *   - mm: 2자리 분 (00~59)
 *   - ss: 2자리 초 (00~59)
 *
 * @param pattern 포맷팅 패턴 문자열 (예: "YYYY-MM-DD hh:mm:ss")
 * @param date (선택) Date 객체, 기본값은 현재 시간
 * @returns 패턴에 맞춘 시간 문자열
 */
const getDate = (pattern: string, date: Date = new Date()): string => {
    const pad = (num: number): string => num.toString().padStart(2, '0');
    const tokens: { [key: string]: string } = {
        'YYYY': date.getFullYear().toString(),
        'MM': pad(date.getMonth() + 1),
        'DD': pad(date.getDate()),
        'hh': pad(date.getHours()),
        'mm': pad(date.getMinutes()),
        'ss': pad(date.getSeconds()),
    };
    // 정규표현식을 사용해 패턴 내의 모든 토큰을 치환
    return pattern.replace(/YYYY|MM|DD|hh|mm|ss/g, (matched) => tokens[matched]);
};


export default getDate;