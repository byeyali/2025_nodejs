// 간단한 웹서버 만들기
const http = require("http");

// req : HTTP 요청, res : HTTP 응답
const server = http.createServer((req, res) => {
  // 요청이 올때마다 실행되는 콜백함수
  // 헤더정보: 브라우저에게 응답 200은 성공, 컨텐츠 타입 텍스트이고 캐릭터셋은 utf-8
  res.writeHead(200, { "content-Type": "text/plain; charset=utf-8" });
  // 본문에 안녕하세요 블라블라 내용을 보내준다.
  res.end("안녕하세요! 양연희의 웹서버에 오셨네요~~~");
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`나만의 웹서버가 http://localhost:${PORT} 에서 실행중입니다.`);
});
