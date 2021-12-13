let arr = [];
for (let i=0; i < 3; i++) {
    arr.push(() => i);
}
console.log(arr.map(x => x())); // [0,1,2]