const users = [
  { id: 1, name: "김민수", age: 25, score: 88 },
  { id: 2, name: "이서연", age: 30, score: 73 },
  { id: 3, name: "박지훈", age: 22, score: 95 },
  { id: 4, name: "최유진", age: 28, score: 67 },
  { id: 5, name: "정우성", age: 27, score: 100 },
  { id: 6, name: "한지민", age: 24, score: 58 },
  { id: 7, name: "오세훈", age: 29, score: 81 },
  { id: 8, name: "윤하늘", age: 26, score: 90 },
];

const youngs = users.filter((user) => {
  console.log(user);
  return user.age < 25;
});

console.log(youngs);

// 문제 1) 점수가 80점 미만
const scores = users.filter((user) => {
  return user.score < 80;
});

console.log(scores);

const userNames = users.map((user) => {
  return user.name;
});

console.log(userNames);

// 문제 2) 아이디와 이름만 반환하는 배열을 만들어보세요.
const userIdNames = users.map((user) => {
  return { id: user.id, name: user.name };
});
console.log(userIdNames);

// 문제 3) 성적이 80점 이상인 친구들의 아이디, 이름, 성적
const user80Overs = users
  .filter((user) => {
    return user.score >= 80;
  })
  .map((user) => {
    return {
      id: user.id,
      name: user.name,
      score: user.score,
    };
  });

console.log(user80Overs);

users.forEach((user) => {
  console.log(`${user.name}님의 점수는 ${user.score} 입니다.`);
});

// reduce 함수
const totalScore = users.reduce((sum, user) => {
  return sum + user.score;
}, 0);

console.log(totalScore);

// 문제 4: 나이가 25 이상인 사람들의 토탈점수
const totalScore2 = users
  .filter((user) => {
    return user.age >= 25;
  })
  .reduce((sum, user) => {
    return sum + user.score;
  }, 0);

console.log(totalScore2);

// 나이 오름차순 정렬
const sortedByAge = [...users].sort((a, b) => {
  return a.age - b.age;
});

console.log(sortedByAge);
