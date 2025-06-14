// https://contest.yandex.ru/contest/59540/problems/E/

const { createInterface } = require("readline");

// let test = ['7',
// '160714711 449656269',
// '822889311 446755913',
// '135599877 389312924',
// '448565595 480845266',
// '561330066 605997004',
// '61020590 573085537',
// '715477619 181424399',
// ];

// let test = ['3',
// '1 5',
// '8 2',
// '4 4',
// ];

function solveTestCase(test){
    let max = null;
    const n = Number(test[0]);
    debugger;
    const sortedBerries = test.slice(1).map((pair, i) => {
        const pairArr =  pair.split(' ');
        let a = Number(pairArr[0]);
        let b = Number(pairArr[1]);
        return {delta: a - b, index: i + 1, a, b};
    }).sort((a, b) => {

        // начать с a
        let firstAStepValue = a.a;
        let leftAStepsValue = a.a - a.b + b.a;
        let firstAStepMax = firstAStepValue >= leftAStepsValue ? firstAStepValue: leftAStepsValue;

        // начать с b
        let firstBStepValue = b.a;
        let leftBStepsValue = b.a - b.b + a.a;
        let firstBStepMax = firstBStepValue >= leftBStepsValue ? firstBStepValue: leftBStepsValue;

        if (firstAStepMax > firstBStepMax) {
            return -1;
        }else if (firstAStepMax < firstBStepMax) {
            return 1;
        }
        return 0;

    });


    let sum = 0;

    sortedBerries.forEach((curr) => {
        let currSum = sum + curr.a;

        if (max === null) {
            max = currSum;
        } else if (max < currSum) {
            max = currSum;
        }

        sum = currSum - curr.b;
    });

    console.log(max);
    // console.log(sortedBerries);
    console.log(sortedBerries.map((item) => item.index).join(' '))

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
