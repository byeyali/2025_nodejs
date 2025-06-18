const os = require("os");

console.log(`운영체체: ${os.type()}`);
console.log(`플랫폼: ${os.platform()}`);
console.log(`아키텍쳐: ${os.arch()}`);
console.log(`호스트명: ${os.hostname()}`);

// cpu 정보
const cpus = os.cpus();
console.log(`cpu코어수: ${cpus.length}`);
console.log(`cpu모델: ${cpus[0].model}`);
console.log(`cpu속도: ${cpus[0].speed} MHz`);

// 메모리 정보
const totalMemoryGB = os.totalmem();
const freeMemoryGB = os.freemem() / 1024 / 1024 / 1024;
console.log(`메모리정보:`);
console.log(`총메모리: ${totalMemoryGB} GB`);
console.log(`사용가능메모리: ${freeMemoryGB.toFixed(2)}GB`);

// 사용자 정보 가지고오기
const userInfo = os.userInfo();
console.log(`사용자 정보`);
console.log(`사용자 이름: ${userInfo.username}`);
console.log(`홈디렉토리 : ${userInfo.homedir}`);
console.log(`쉘 : ${userInfo.shell}`);
