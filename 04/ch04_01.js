// 1. Express 모듈 가져오기
const express = require("express");

// 2. Express 애플리케이션 설정
const app = express();

// 3. 포트 설정
const PORT = 3000;

// 4. 라우팅 설정
// app.get GET 요청을 처리하는데 http://localhost:3000
app.get("/", (req, res) => {
  // req : HTTP 요청, res : HTTP 응답
  res.send("Hello World");
});

// hello
app.get("/hello", (req, res) => {
  res.send("안녕 /hello 주소에 접근하셨습니다.");
});

// 문제 1) http://localhost:3000/world GET 요청시
// 응답을 안녕 /world 주소에 접근하였습니다.
app.get("/world", (req, res) => {
  res.send("안녕 /world 주소에 접근하였습니다.");
});

// 5. 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 실행중 입니다.`);
});
