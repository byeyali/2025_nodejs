// 파일 다루기 fs 모듈 이용
const fs = require("fs"); // commonjs 방식 - fs 모듈(파일 다루기 모듈) 임포트

// fs.writeFileSync("test.txt", "hello world");
// console.log("파일 쓰기 완료");

// // 문제 1. hello.txt 만들고, 내용에는 안녕하세요 반갑습니다. 제 이름은 양연희 입니다.
// fs.writeFileSync(
//   "hello.txt",
//   "안녕하세요 반갑습니다. 제 이름은 양연희 입니다."
// );

// // 파일 읽기
// const data = fs.readFileSync("test.txt", "utf-8"); // 공통 인코딩 포맷 utf-8 인코딩
// console.log(data);

// // 문제 2. hello.txt 읽고 콘솔로 출력
// // 만약 hello.txt 1기가 파일이었다 17 라인은 16라인이 처리끝날때까지 대기
// const data1 = fs.readFileSync("hello.txt", "utf-8");
// console.log(data1);

// // 파일 상태 확인
// const stats1 = fs.statSync("test.txt");
// console.log(stats1);

fs.writeFile("async-test.txt", "Async Hello World!", (err) => {
  if (err) {
    console.log(err);
  }
  console.log("비동기 쓰기 완료");
});

// 문제 3 async-hello.txt 파일 만들고, 안녕하세요 비동기 파일 쓰기 테스트 작업입니다.
fs.writeFile(
  "async-hello.txt",
  "Hello!!! Async File Writing Testing Job!!!",
  (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Hello Async Write File Complete!!!");
  }
);

fs.readFile("async-test.txt", "utf-8", (err, data) => {
  if (err) {
    console.log("읽기 에러", err);
  }
  console.log("비동기 파일읽기=", data);
});

// 문제 4 async-hello.txt 를 fs.readFile 로 읽어보세요.
fs.readFile("async-hello.txt", "utf-8", (err, data) => {
  if (err) {
    console.log("읽기 에러", err);
  }
  console.log(data);
});

const fsPromise = require("fs").promises;

const fileOp = async () => {
  try {
    await fsPromise.writeFile("promise-test.txt", "promise hello world");
    console.log("======파일 쓰기 완료");

    const dataP = await fsPromise.readFile("promise-test.txt", "utf-8");
    console.log("======파일 읽기 완료", dataP);
  } catch (e) {
    console.log(e);
  }
};

fileOp();

// 문제 5 fileOp2 라는 함수를 만들고 promise 방식으로 promise-hello.txt 넣고
// 안녕하세요 프로미스 방식으로 파일을 읽는 연습을 하고 있어요 쓰고,
// promise-hello.txt 다시 읽어서 콘솔에 출력해 보세요.
const fileOp2 = async () => {
  try {
    await fsPromise.writeFile(
      "promise-hello.txt",
      "안녕하세요 프로미스 방식으로 파일을 읽는 연습을 하고 있어요"
    );
    console.log("########await 쓰기완료");
    const dataP2 = await fsPromise.readFile("promise-hello.txt", "utf-8");
    console.log("########await 읽기완료####", dataP2);
    console.log(dataP2);
  } catch (e) {
    console.log(e);
  }
};

fileOp2();
