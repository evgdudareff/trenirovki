// https://contest.yandex.ru/contest/59540/problems/A/

const { createInterface } = require("readline");

// let test = ['3', '1 1', '1 10', '5 5'];

function solveTestCase(test){
    const [k] = test.shift();
    const coords = test.map((pairStr) => pairStr.split(' '));

    if (k === 1) {
        console.log(`${coords[0][0]} ${coords[0][1]} ${coords[0][0]} ${coords[0][1]}`);
        return;
    }

    let leftY = null;
    let rightY = null;
    let upX = null;
    let downX = null;

    coords.forEach(([xStr,yStr]) => {
        let x = Number(xStr);
        let y = Number(yStr);

        if (leftY !== null && y < leftY) {
            leftY = y;
        } else if (leftY === null) {
            leftY = y;
        }

        if (rightY !== null && y > rightY) {
            rightY = y;
        } else if (rightY === null) {
            rightY = y;
        }

        if (upX !== null && x < upX) {
            upX = x;
        } else if (upX === null) {
            upX = x;
        }

        if (downX !== null && x > downX) {
            downX = x;
        } else if (downX === null) {
            downX = x;
        }

    });

    console.log(`${upX} ${leftY} ${downX} ${rightY}`);


    // console.log(k);
    // console.log(coords);
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
