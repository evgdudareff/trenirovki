const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);


let n;
let numbers;
let k;
let lineNumber = 0;

function onLineListener (line) {
    if (lineNumber === 0) {
        n = Number(line);
        lineNumber++;
    } else if (lineNumber === 1) {
        numbers = line.split(' ');
        lineNumber++;
    } else {
        k = Number(line);
    }
}


function getDiffCountLessOrEqualThanMaxDiff(sortedArr, k) {
    let sortedArrLength = sortedArr.length;
    let diffCountLessThanK = 0;

    let i = 0;
    for (let j = 0; j < sortedArrLength; j++) {
        while (Math.abs(Number(sortedArr[i]) - Number(sortedArr[j])) > k) {
            i++;
        }

        diffCountLessThanK += j - i;
    }

    return diffCountLessThanK;
}



function solve() {
    const sortedNumbers = numbers.sort((a, b) => a - b);
    let lessOrEqualThanK;

    let min = 0; // меньше быть не может в принципе
    let max = sortedNumbers[sortedNumbers.length - 1] - sortedNumbers[0];

    while (min <= max) {
        if (min === max) {
            lessOrEqualThanK = min;
            break;
        }

        let mid = Math.floor((max + min) / 2);
        lessOrEqualThanK = getDiffCountLessOrEqualThanMaxDiff(sortedNumbers, mid);

        if (lessOrEqualThanK >= k) {
            max = mid;
        } else {
            min = mid + 1;
        }
    }

    process.stdout.write(`${lessOrEqualThanK}`);

}
