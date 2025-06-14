const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);


let n;
let numbers;
let lineNumber = 0;

function onLineListener (line) {
    if (lineNumber === 0) {
        n = Number(line);
        lineNumber++;
    } else {
        numbers = line.split(' ').map(Number);
    }
}

function sumOfConsecutiveSequence(min, max) {
    return ((min + max) * (max - min + 1)) / 2;
}

function solve() {
    let i = 0;
    let ans = 0;
    let currGroupLength = 0;

    let desirableSum = 0;
    let min = 0;
    let max = 0;
    let sum = 0;
    let hasZero = false;

    while (i < n) {
        let curr = numbers[i];

        if (curr === 0) {
            hasZero = true;
        }

        if (curr > max) {
            max = curr;
            desirableSum = sumOfConsecutiveSequence(min, max);
        }

        sum = sum + curr;
        if (sum === desirableSum && hasZero) {
            ans++;
            desirableSum = max + 1;
            min = desirableSum;
            max = min;
            sum = 0;
        }

        i++
    }

    process.stdout.write(`${ans}`);

}
