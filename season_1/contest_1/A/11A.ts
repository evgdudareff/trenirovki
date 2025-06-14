// https://contest.yandex.ru/contest/27393/problems/A/

const { createInterface } = require("readline");

type Command = 'freeze' | 'heat' | 'fan' | 'auto';
function solveTestCase(test: [string, Command]) {
    const [tRoom, tCond] = test[0].split(' ').map(Number);
    const command: Command = test[1];
    let res = null;

    switch (command) {
        case "freeze":
            if (tRoom <= tCond) {
                res = tRoom;
            } else {
                res = tCond;
            }
            break;

        case "heat":
            if (tRoom >= tCond) {
                res = tRoom;
            } else {
                res = tCond;
            }
            break;

        case "fan":
            res = tRoom;
            break;

        case "auto":
            res = tCond;
            break;
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
    solveTestCase(lines as [string, Command]);
});
