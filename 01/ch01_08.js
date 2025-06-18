const fruits = ["사과", "수박", "바나나", "오렌지"];
const [first, second] = fruits;
console.log(first, second);

const student = {
  name: "이지훈",
  age: 50,
  grade: "B",
};

const { name, age, grade } = student;
console.log(name, age, grade);

const { name: name1, age: age1, grade: grade1 } = student;
console.log(name1, age1, grade1);

const person = {
  name: "홍길동",
};
const { name: personName, age: personAge = 25 } = person;

const printStudentInfo = ({ name, age, grade = "B" }) => {
  console.log(`학생정보`);
  console.log(`- 이름 : ${name}`);
  console.log(`- 나이 : ${age}`);
  console.log(`- 성적: ${grade}`);
};
printStudentInfo(student);

const book = {
  title: "자바스크립트 최고",
  author: "홍길동",
  publisher: "한빛",
};

const printBook = ({ title, author, publisher }) => {
  console.log(`책정보`);
  console.log(`- 책이름 : ${title}`);
  console.log(`- 저자 : ${author}`);
  console.log(`- 출판사 : ${publisher}`);
};
printBook(book);

const user = {
  id: 1,
  info: {
    name: "홍길동",
    address: {
      city: "서울",
      street: "강남대로",
    },
  },
};

const colors = ["빨강", "파랑", "노랑", "초록", "보라"];
const [firstcolors, secondcolors, ...others] = colors;
console.log(firstcolors, secondcolors, others);

const user1 = { name: "소지섭", age: 45, email: "so@email.com" };
const user2 = { name: "전종서", age: 30 };

const formatUserInfo = ({ name, age, email = "default" }) => {
  return `이름은 ${name}, 나이는 ${age}, 이메일은 ${email}`;
};

console.log(formatUserInfo(user1));
console.log(formatUserInfo(user2));
