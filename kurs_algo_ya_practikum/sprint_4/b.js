const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);

let n;
let nums;
let lineNumber = 0;


function onLineListener (line) {
    if (lineNumber === 0) {
        n = Number(line);
        lineNumber++;
    } else {
        nums = line.split(' ').map((num, index) => {
           return num === '1' ? 1 : -1;
        });
    }
}

// 10
// 0 0 1 0 1 1 1 0 0 0

// 10
// 0 0 1 0 0 0 1 0 0 1

function solve() {
    let bestAns = 0;
    let prefixSums = {};
    let currSum = 0;

    for (let i = 0; i < n; i++) {
        currSum += nums[i];

        if (currSum === 0) {
            bestAns = Math.max(bestAns, i + 1);
        }

        if (!(currSum in prefixSums)){
            prefixSums[currSum] = i;
        } else {
            let prevIndexSameSum = prefixSums[currSum];
            let diff = i - prevIndexSameSum;
            bestAns = Math.max(bestAns, diff);
        }
    }

    process.stdout.write(`${bestAns}`)
}

