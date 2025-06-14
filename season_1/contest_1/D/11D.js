
// https://contest.yandex.ru/contest/27393/problems/D/
const {createInterface} = require("readline");
const lines = [];


function solveTestCase(test) {
    const [a, b, c] = test.map(Number);

    if (c < 0) {
        console.log('NO SOLUTION');
        return;
    }

    if (a === 0) {
        if (b === c * c) {
            console.log('MANY SOLUTIONS');
            return;
        }
    }

    const rightSide = c*c - b;
    if (rightSide === 0) {
        console.log(0);
        return;
    }

    if (rightSide % a === 0) {
        console.log(rightSide/a);
    } else {
        console.log('NO SOLUTION');
    }
}


createInterface({
    input: process.stdin,
    output: process.stdout,
}).on("line", (line) => {
    lines.push(line.toString().trim());
}).on("close", () => {
    solveTestCase(lines);
});
