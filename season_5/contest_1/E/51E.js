// https://contest.yandex.ru/contest/59539/problems/E/

const { createInterface } = require("readline");

function solveTestCase(test) {
    const [n, k, d] = test[0].split(' ').map(Number);


    let kBignt = BigInt(k);
    let counter = d;
    let x = BigInt(n);
    let stop = false;
    const res = [];

    while (counter > 0 && !stop){
        if (BigInt(`${x}${9}`) < k) {
            res.push(-1);
            break;
        } else {
            for (let i = 0; i <= 9; i++){
                const currX = BigInt(`${x}${i}`);
                if (currX % kBignt === 0n) {

                    if (i === 0 && res.length === 3 && currX / res[0]  === 1000n) {
                        const finalAns = `${currX}${'0'.repeat(counter-1)}`;
                        res.push(finalAns);
                        stop = true;
                        break;
                    }
                    res.push(currX);
                    counter--;
                    x = currX;
                    break;
                }

                if (i === 9) {
                    stop = true;
                    res.push(-1);
                }
            }
        }
    }


    console.log(String(res.pop()));

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
