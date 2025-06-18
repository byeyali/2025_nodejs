const { validateHeaderValue } = require("http");
const validator = require("validator");

const email = "test@email.com";
console.log(`이메일 검증 ${email}은 ${validator.isEmail(email)}`);

const url = "www.naver.com";
console.log(`URL 검증 ${url}은 ${validator.isURL(url)}`);

const ip = "3.35.132.150";
console.log(`IP 검증 ${ip}는 ${validator.isIP(ip)}`);

const tel = "01012345679";
console.log(`전화번호 ${tel}는 ${validator.isMobilePhone(tel)}`);

const num = "12345";
console.log(`숫자검증 ${num}는 ${validator.isNumeric(num)}`);

const date1 = "2024-09-11";
console.log(`날짜 검증 ${date1} ${validator.isDate(date1)}`);

const password1 = "passworD123#";
const v1 = validator.isStrongPassword(password1, {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
});
console.log(`비밀번호 ${password1} 은 ${v1}`);
