// https://contest.yandex.ru/contest/59540/problems/C/

const { createInterface } = require("readline");

// let test = [];

function solveTestCase(test){
    let res = null;
    const N = Number(test[0]);
    const stripes = test[1].split(' ').map(Number);

    const sortedStripes = stripes.sort((a,b) => a - b);
    const max = sortedStripes.pop();

    const sumExceptMax = sortedStripes.reduce((sum, curr) => {
        return sum + curr;
    });

    if (sumExceptMax < max) {
        res = max - sumExceptMax;
    } else {
        res = max + sumExceptMax;
    }

    console.log(res);

}

// solveTestCase(test);




const lines = [];
createInterface({
    input: process.stdin,
    output: process.stdout,
}).on("line", (line) => {
    lines.push(line.toString().trim());
}).on("close", () => {
    solveTestCase(lines);
});
