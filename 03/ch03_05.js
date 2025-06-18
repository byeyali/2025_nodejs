// .env 파일을 프로그램상에 로드
require("dotenv").config();

console.log(`서버포트 : ${process.env.PORT}`);
console.log(`DB NAME : ${process.env.DB_NAME}`);
console.log(`DB USER : ${process.env.DB_USER}`);
console.log(`DB PASSWORD : ${process.env.DB_PASSWORD}`);
console.log(`API_KEY : ${process.env.API_KEY}`);
console.log(`NODE_ENV : ${process.env.NODE_ENV}`);

console.log(`DB PORT : ${process.env.DB_PORT || 5432}`);

if (!process.env.OPENAI_API_KEY) {
  console.error(`OPEN AI KEY 가 필요`);
}

if (process.env.NODE_ENV === "development") {
  console.log(`개발환경 처리`);
} else {
  console.log(`운영환경 처리`);
}
