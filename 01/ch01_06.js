const person1 = {
    name : '이지훈',
    age : 50,
    job : 'sw engineer'
}

console.log(person1.name, person1['name']);

person1.hobby = ["cook", "fishing"];
console.log(person1);

console.log(Object.keys(person1));
console.log(Object.values(person1));

person1.addAge = function() {
    this.age = this.age + 1;
}
person1.addAge();
console.log(person1);

class PersonInfo {
    constructor(name, age, address) {
        this.name = name;
        this.age = age;
        this.address = address;
    }

    addAge(age) {
        this.age = this.age + age;
    }

    getAge() {
        return this.age;
    }
}

let p1 = new PersonInfo("이지훈", 50, "신정동");
console.log(p1);
p1.addAge(50);
console.log(p1.getAge());

class Employee extends PersonInfo {
    constructor(name, age, address, salary) {
        super(name, age, address);
        this.salary = salary;
    }
}

let e1 = new Employee("홍길동", 60, "인천 부평", 10000000);
console.log(e1);


try {
    const arr = new Array(-1);

} catch(e) {
    console.log("예외발생", e);
} finally {
    console.log("예외가 발생해도 이작업은 반드시 필요");
}

try {
    const err = new Error("나만의 에러");
    err.name = "나만의 에러";
    err.message = "나만의 에러가 완성되었어요";
    throw err;

} catch(e) {
    console.log(e.name, e.message);
}


class CarInfo{
    constructor(brand, color, model) {
        this.brand = brand;
        this.color = color;
        this.model = model;
    }

    drive() {
        console.log(`모델 ${this.model}가 달리는중`);
    }

    stop() {
        console.log(`모델 ${this.model}이 멈췄습니다.`);
    }
}

let car1 = new CarInfo("BMW", "BLACK", "Z5");
console.log(car1);
car1.drive();
car1.stop();

class ElecticCarInfo extends CarInfo {
    constructor(brand, color, model, battery) {
        super(brand, color, model);
        this.battery = battery;
    }
    charge() {
        console.log(`모델 ${this.model}가 충전중`);
    }
}

let elecCar1 = new ElecticCarInfo("현대","레드","그랜져",8000);
elecCar1.charge();
elecCar1.drive();
elecCar1.stop();