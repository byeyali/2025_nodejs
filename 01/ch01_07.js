const fetchData = (callback) => {
  setTimeout(() => {
    const data = "서버에서 받은 데이터";
    callback(data);
  }, 1000);
};

// 서버에서 받은 데이터를 처리하는 내용. 데이터 파싱 등등
const handleData = (data) => {
  console.log("콜백에서 받은 받은 데이타", data);
};

//fetchData(handleData);

const fetchDataPromise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true; // 작업성공여부
      // 외부에서나 db에서 데이터를 가지고 오는 로직 있는 자리
      if (success) {
        resolve(); // 성공했을때 호출되는 함수
      } else {
        reject(); // 실패했을때 호출되는 함수
      }
    }, 1000);
  });
};
fetchDataPromise()
  .then((data) => {
    // resolve -> 데이터 패치 성공시 실행
    console.log("프로미스에서 받은 데이터", data);
  })
  .catch((error) => {
    // reject -> 데이터 패치 실패시 실행
    console.log("에러", error);
  });

const getData = async () => {
  try {
    const data = await fetchDataPromise();
    console.log("async/await data", data);
  } catch (e) {
    console.log("에러", error);
  }
};

const greet = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("안녕하세요!");
    }, 2000);
  });
};

greet().then((message) => {
  console.log(message);
});

const sayHi = async () => {
  try {
    const data = await greet();
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};
