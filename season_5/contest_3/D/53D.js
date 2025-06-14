// https://contest.yandex.ru/contest/59541/problems/D/

const { createInterface } = require("readline");


//let test = ['4 2', '1 2 3 1'];

function solveTestCase(test){
    debugger;
    const [n,k] = test[0].split(' ').map(Number);
    const numbers = test[1].split(' ').map(Number);


    const mapOfRes = {};

    for (let i = 0; i < n; i++) {

        let curr = numbers[i];
        if (curr in mapOfRes) {
            if (mapOfRes[curr] + k >= i + 1) {
                console.log('YES');
                return;
            } else {
                mapOfRes[curr] = i + 1;
            }
        } else {
            mapOfRes[curr] = i + 1;
        }

    }

    console.log('NO');


}

//solveTestCase(test);


const lines = [];
createInterface({
    input: process.stdin,
    output: process.stdout,
}).on("line", (line) => {
    lines.push(line.toString().trim());
}).on("close", () => {
    solveTestCase(lines);
});

