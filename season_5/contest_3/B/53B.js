// https://contest.yandex.ru/contest/59541/problems/B/

const { createInterface } = require("readline");


/*let test = [
    '2',
'2',
'Love Life',
'2',
'Life GoodDay',
]*/

function solveTestCase(test){
    const first = test[0];
    const second = test[1];

    if (first.length !== second.length) {
        console.log('NO');
    }

    const firstSorted = [...first].sort();
    const secondSorted = [...second].sort();

    for (let i = 0; i < first.length; i++) {
        let firstLetter = firstSorted[i];
        let secondLetter = secondSorted[i];

        if (firstLetter !== secondLetter) {
            console.log('NO');
            return;
        }
    }

    console.log('YES');


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

