// https://contest.yandex.ru/contest/59541/problems/C/

const { createInterface } = require("readline");


//let test = ['5', '1 2 3 4 5'];

function solveTestCase(test){
    debugger;
    const n = Number(test[0]);
    const numbers = test[1].split(' ').map(Number).sort((a, b) => a - b);

    if (n === 1) {
        console.log(0);
        return;
    }

    if (numbers[0] === numbers[n - 1] || numbers[0] + 1 === numbers[n-1]){
        console.log(0);
        return;
    }




    const mapOfRes = {};

    for (let i = 0; i < n; i++) {

        let curr = numbers[i];
        if (curr in mapOfRes) {
            mapOfRes[curr] = mapOfRes[curr] + 1;
        }
        else {
            mapOfRes[curr] = 1;
        }

        if ((curr - 1) in mapOfRes) {
            mapOfRes[curr - 1] = mapOfRes[curr - 1] + 1;
        }

    }

    const max = Math.max(...Object.values(mapOfRes));

    //console.log(mapOfRes);
    console.log(n - max);


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

