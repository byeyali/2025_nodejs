const express = require("express");
const moment = require("moment");
const app = express();
const PORT = 3000;

const memos = [
  {
    id: 1,
    title: "샘플 메모1",
    content: "오늘점심메뉴는",
    createdAt: "2025-06-19",
  },
  {
    id: 2,
    title: "샘플 메모2",
    content: "내일부터 장마시작. 비가 덜왔음",
    createdAt: "2025-06-19",
  },
];

// 요청본문에 JSON 본문 인식 처리 - 반드시 기술
app.use(express.json());

// 1. 메모목록 반환
app.get("/memos", (req, res) => {
  res.status(200).json(memos);
});

// 2. 메모1개 반환
app.get("/memos/:id", (req, res) => {
  const id = req.params.id;

  const memo = memos.find((b) => b.id === parseInt(id));
  if (!memo) {
    return res.status(404).json("error", "메모를 찾을 수 없어요");
  }
  res.json(memo);
});

// 3. 메모 쓰기
app.post("/memos", (req, res) => {
  const { title, content } = req.body;
  const maxId = memos.reduce((max, memo) => Math.max(max, memo.id), 0);

  console.log(maxId);
  const nowDate = moment();
  const memo = {
    id: maxId + 1,
    title,
    content,
    createdAt: moment().format("YYYY-MM-DD"),
  };
  memos.push(memo);
  res.status(201).json(memo);
});

// 4. 메모 수정
app.put("/memos/:id", (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;

  const memo = memos.find((memo) => memo.id === parseInt(id));
  if (!memo) {
    return res.status(404).json("error", "메모를 찾을 수 없습니다.");
  }
  memo.title = title;
  memo.content = content;
  memo.createdAt = moment().format("YYYY-MM-DD");
  res.status(200).json(memo);
});

// 5. 메모 삭제
app.delete("/memos/:id", (req, res) => {
  const id = req.params.id;
  const index = memos.findIndex((memo) => memo.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json("error", "메모를 찾을 수 없어요");
  }
  memos.splice(index, 1);
  res.status(204).send();
});

// 서버
app.listen(PORT, (req, res) => {
  console.log(`http://localhost:${PORT} 실행중`);
});
