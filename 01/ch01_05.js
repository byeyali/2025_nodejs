function add1(x, y) {
    return x+y;
}

console.log(add1(1,2));

const add2 = function(x, y) {
    return x + y ;
}

console.log(add2(2,3));

const add3 = (x, y) => {
    return x+y;
}
console.log(add3(3,4));

const ten = (cb) => {
    for(let i=0;i<10;i++) {
        cb();
    }
}

ten(function() {
    console.log('call function');
});

setTimeout(function() {
    console.log(`1초뒤에 호출`)
}, 1000);

setInterval(function() {
    console.log(`1초마다 계속 실행`);
}, 1000);

