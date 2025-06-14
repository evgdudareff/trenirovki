// https://contest.yandex.ru/contest/59539/problems/F/

const {createInterface} = require("readline");


function solveTestCase(test) {
    const n = Number(test[0]);
    let res = '';
    debugger;
    const numbers = test[1].split(' ').reduce((prev, num, currIndex) => {


        if (currIndex === 1) {
            prev = Number(prev) % 2 === 0 ? 0 : 1;
        }
        const curr = Number(num) % 2 === 0 ? 0 : 1;

        // произведение нечетных - всегда нечетное
        if (prev === 1 && curr === 1) {
            res = res + 'x';
            return 1;
        }

        // произведение четных - всегда четное
        if (prev === 0 && curr === 0) {
            res = res + 'x';
            return 0;
        }

        // сумма нечетных - всегда нечетное
        if ((prev === 0 && curr === 1) || (prev === 1 && curr === 0)) {
            res = res + '+';
            return 1;
        }

    })


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
