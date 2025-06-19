const express = require("express");

const app = express();
app.get("/", (req, res) => {
  res.send(`
        <html>
            <head>
                <title>첫번째 홈피</title>
            </head>
            <body>
                <h1>첫번째 익스프레스 홈</h1>
                <nav>
                    <a href="/">홈</a>
                    <a href="/about">소개</a>
                    <a href="/contact">연락처</a>
                </nav>
                <p>익스프레스로 만든 간단한 홈피입니다.</p>
            </body>

        </html>
        `);
});

app.get("/about", (req, res) => {
  res.send(
    `<h1>소개페이지</h1><p>이 홈피는 익스프레스 학습을 위해 맹글었어요.</p>`
  );
});

app.get("/contact", (req, res) => {
  res.send(`<h1>연락처</h1><p>이메일 : byeyali92@gmail.com</p>`);
});

// 문제1. 서버시작코드, 포트 3001
// 5. 서버 시작
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 실행중 입니다.`);
});
