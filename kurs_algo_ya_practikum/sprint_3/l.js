const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);

let lineNumber = 0;
let n;
let days;
let s;

function onLineListener (line) {
    if (lineNumber === 0) {
        n = Number(line)
    } else if (lineNumber === 1) {
        days = line.split(' ').map(Number);
    } else if (lineNumber === 2) {
        s = Number(line);
    }
    lineNumber++;
}

function binSearchBestDay(arr, s, left, right){
    if (left >= right) {
        if (arr[left] >= s) {
            return left;
        }
        return null;
    }

    const mid = Math.floor((right - left) / 2);
    const midIndex = mid + left;
    if (arr[midIndex] >= s) {
        const bestDayIndex = binSearchBestDay(arr, s, left, midIndex);
        return bestDayIndex === null ? midIndex : Math.min(bestDayIndex, midIndex);
    } else {
        return binSearchBestDay(arr, s, midIndex + 1, right);
    }
}

function solve() {
    const bicycle1 = binSearchBestDay(days, s, 0, days.length - 1);
    const bicycle1Ans = bicycle1 !== null ? bicycle1 + 1: -1;

    const bicycle2 = binSearchBestDay(days, s*2, 0, days.length - 1);
    const bicycle2Ans = bicycle2 !== null ? bicycle2 + 1: -1;

    process.stdout.write(`${bicycle1Ans} ${bicycle2Ans}`);
}

// 6
// 6 6 6 6 6 6
// 6

// 1
// 10
// 5

// 6
// 1 1 1 1 4 5
// 2
