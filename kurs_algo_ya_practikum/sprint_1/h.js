const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


let numbers = [];
let maxLength = 0;

ioInterface.on('line', line => {
    if (line.length > maxLength) {
        maxLength = line.length;
    }
    numbers.push(line);
});

ioInterface.on('close', solve);

function addTwo(a, b) {
    if (a === '1' && b === '1') {
        return {res: '0', rest: '1'};
    }

    if ((a === '1' && b === '0') || (a === '0' && b === '1')) {
        return {res: '1', rest: '0'};
    }

    if (a === '0' && b === '0') {
        return {res: '0', rest: '0'};
    }
}

function padNumberWithZero(n, length) {
    if (n.length === length) {
        return n;
    }

    return n.padStart(length, '0');
}

function solve() {
    let [a, b] = numbers;
    a = padNumberWithZero(a, maxLength);
    b = padNumberWithZero(b, maxLength);

    let answer = '';
    let lastRest = '0';

    for (let i = maxLength - 1; i >= 0; i--) {
        const currNumA = a[i];
        const currNumB = b[i];
        const currSum = addTwo(currNumA, currNumB);
        const currSumWithLastRest = addTwo(currSum.res, lastRest);
        answer = currSumWithLastRest.res + answer;

        lastRest = currSum.rest === '1' || currSumWithLastRest.rest === '1' ? '1' : '0';
    }

    if (lastRest === '1') {
        answer= lastRest + answer;
    }

    process.stdout.write(answer);

}