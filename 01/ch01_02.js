let pi;

console.log(pi);
pi = 3.141592;
console.log(pi);

let radius = 12;
console.log(`넓이 : ${pi * radius * radius}`);
console.log(`둘레 : ${pi * 2 * radius}`);


radius = 15;
let area = pi * radius * radius;
console.log(`넓이 : ${area}`);

let width = 10;
let height = 15;

let area2 = 10 * 15;
console.log(`넓이 : ${area2}`);

let num = 0;
num++;

console.log(num);
num--;
console.log(num);

console.log(String(52));
console.log(typeof String(52));

console.log(Number("52"));
console.log(typeof Number(52));

console.log(parseInt("1234"));
console.log(parseInt("1234.56"));
console.log(parseFloat("1234.56"));

console.log(Number("hello"));
console.log(isNaN(Number("hello")));

console.log(typeof 10);
console.log(typeof "hello");
console.log(typeof true);
console.log(typeof function(){});
console.log(typeof {});
console.log(typeof []);

const test = "변경불가";