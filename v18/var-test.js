var arr = [];

for (let i = 0; i < 3; i++) {
    arr.push(function() {
        console.log(i);
    });
}

arr[0](); // 0
arr[1](); // 1
arr[2](); // 2

// let b = a + 5;

// let a = 1;

// console.log('b: ' + b);

// function func(a) {
//     var a;

//     return true;
// }

// console.log(func());