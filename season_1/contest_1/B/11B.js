// https://contest.yandex.ru/contest/27393/problems/B
const { createInterface } = require("readline");


function solveTestCase(test) {
    const [a, b, c] = test.map(Number);

    if ((a + b > c) && (a + c > b) && (b + c > a)) {
        console.log('YES')
    } else {
        console.log('NO')
    }
}

const lines = [];
createInterface({
    input: process.stdin,
    output: process.stdout,
}).on("line", (line) => {
    lines.push(line.toString().trim());
}).on("close", () => {
    solveTestCase(lines);
});
