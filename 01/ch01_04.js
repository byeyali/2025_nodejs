 let arr = [5, 23, "hello", true, "world", -9];

// console.log(arr);
// console.log(arr[0]);

// console.log("-----for문-----")
// for(let i=0; i<arr.length; i++) {
//     console.log(`${i} is ${arr[i]}`);
// }

// console.log("-----for in -----")
// for(i in arr) {
//     console.log(`${i} is ${arr[i]}`);
// }

// console.log("-----for of-----")
// for(e of arr) {
//     console.log(e);
// }


for(i in arr) {
    if(typeof arr[i] == "string") {
        break;
    }
    console.log(arr[i]);
}

for(i in arr) {
    if(typeof arr[i] == "string") {
        continue;
    }
    console.log(arr[i]);
}

console.log('=======문제1=======');
let arr1 = [1, 2, "멈춰", 3, 4, true, false];
for (i in arr1) {
    if(arr1[i] == "멈춰") {
        break;
    }
    console.log(arr1[i]);
}

console.log('=======문제2=======');
let arr2 = [5,10,15,20,25];
for (i in arr2) {
    if (arr2[i] >= 20) break;

    console.log(`${arr2[i]}`);
}

console.log('=======문제3=======');
let arr3 = [1,2,3,4,5,6,7,8,9,10];
for (i in arr3) {
    if (arr3[i] % 2 != 0) continue;

    console.log(`${arr3[i]}`);
}

console.log('=======문제4=======');
for (i in arr3) {
    if (arr3[i] % 3 == 0) continue;

    console.log(`${arr3[i]}`);
}

console.log('=======문제5=======');
let arr4 = ["사과", 1, "바나나", 2, "포도", false];
for(i in arr4) {
    if(typeof arr4[i] == "string") {
        console.log(arr4[i]);
    }
}