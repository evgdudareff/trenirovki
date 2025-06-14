// https://contest.yandex.ru/contest/59539/problems/A/

const { createInterface } = require("readline");


function solveTestCase(test) {
    const [p, v] = test[0].split(' ').map(Number);
    const [q, m] = test[1].split(' ').map(Number);
    let res = null;

    const firstRange = [p -v, p, p+ v];
    const secondRange = [q-m, q, q+m];

    const hasIntersactiion = !(firstRange[0] > secondRange[2] || firstRange[2] < secondRange[0]);


    if (hasIntersactiion) {
        const intersactionRange = [...firstRange, ...secondRange].sort((a, b) => a-b);
        const leftBound = intersactionRange[0];
        const rightBound = intersactionRange[intersactionRange.length - 1];
        res = rightBound - leftBound + 1;
    } else {
        const firstRangeRes = firstRange[2] - firstRange[0] + 1;
        const secondRangeRes =secondRange[2] - secondRange[0] + 1;
        res = firstRangeRes + secondRangeRes;
    }

    console.log(res);
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
