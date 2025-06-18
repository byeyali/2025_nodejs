const moment = require("moment");
const { diff } = require("util");

const nowDate = moment();
console.log(nowDate.format("YYYY-MM-DD HH:mm:ss"));
console.log(nowDate.format("YYYY년 MM월 DD일"));
console.log(nowDate.format("YYYY년 MM월 DD일 HH시 mm분 ss초"));

// 문제1. 현재 날짜 + 시작 2025/06/18로 출력
console.log(nowDate.format("YYYY/MM/DD"));

// 날짜 포맷팅
const dateMoment = moment("2024-03-30");
console.log(dateMoment);

// 시간 추가 및 빼기
const nextDays = nowDate.add(7, "weeks");
console.log(nextDays);

// 시간 차이 계산
const startDate = moment();
const endDate = moment("2025-08-20");
const diffDay = endDate.diff(startDate, "days");
console.log(diffDay);

// 문제 2
// 오늘부터 100일 후의 날짜를 YYYY년 MM월 DD일로 출력해 보세요'
const today2 = moment();
console.log(today2.add(100, "days").format("YYYY년 MM월 DD일"));

// 문제 3
// 2024-03-15부터 2025-09-20일까지 몇개월이 지났는지 계산해 보세요.
const startDt = moment("2024-03-15");
const endDt = moment("2025-09-20");
const dayAfter = endDt.diff(startDt, "months");
console.log(dayAfter);

// 문제4
// 크리스마스까지 남은 일수 계산
const christmas = moment("2025-12-25");
const today = moment();
const dayAfter2 = christmas.diff(today, "days");
console.log(dayAfter2);
