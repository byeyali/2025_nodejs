const path = require("path");

const fullPath = path.join(__dirname, "files", "text.txt");
console.log(`전체경로:${fullPath}`);
//__dirname : 현재 파일의 디렉토리 절대 경로를 가져옴

// 문제 1 : fullPath2 변수에 현재 디렉토리/files/task/jobs/01.txt 경로를 만들어보세요.
const fullPath2 = path.join(__dirname, "files", "tasks", "jobs", "01.txt");
console.log(fullPath2);

const pathParts = path.parse(fullPath);
console.log(pathParts);

// 문제 2 : fullPath2 parse 를 이용해서 경로를 분리해보세요.
const pathParts2 = path.parse(fullPath2);
console.log(pathParts2);

const ext = path.extname(fullPath);
console.log(ext);

const fs = require("fs");

const dirPath = path.join(__dirname, "new_dir");
console.log(dirPath);

if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// 문제1. dirPath2 변수를 만들고 현재디렉토리 밑에 tasks 디렉토리를 만들어 보세요.

const dirPath2 = path.join(__dirname, "tasks");
if (!fs.existsSync(dirPath2)) {
  fs.mkdirSync(dirPath2);
}

const dirPath3 = path.join(__dirname, "tasks", "jobs", "01");
if (!fs.existsSync(dirPath3)) {
  fs.mkdirSync(dirPath3, { recursive: true });
}

const filePath = path.join(dirPath3, "test.txt");
fs.writeFileSync(filePath, "디렉토리 생성후 파일생성 테스트");

// 문제 2 : 현재 디렉토리 밑에 main/src/code/javascript.txt 파일을 생성하고
// 파일안에 "자바스크립트 테스트 파일입니다." 를 쓰세요.
// 1. 디렉토리 생성, 2. 파일을 만들고 쓴다.
//const dirPath4 = path.join(__dirname, "main", "src", "code");
const dirPath4 = path.join(__dirname, "main", "src", "code");

if (!fs.existsSync(dirPath4)) {
  fs.mkdirSync(dirPath4, { recursive: true });
}

const filePath4 = path.join(dirPath4, "javascript.txt");
fs.writeFileSync(filePath4, "자바스크립트 테스트 파일입니다.");

// 디렉토리 이름 변경
const newDirPath = path.join(__dirname, "rename-dir");
fs.renameSync(dirPath, newDirPath);

// 디렉토리 삭제
fs.rmdirSync(newDirPath);
