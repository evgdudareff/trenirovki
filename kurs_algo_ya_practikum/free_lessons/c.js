const _readline = require('readline');

const _reader = _readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const _inputLines = [];
let _currLine = 0;
_reader.on('line', line => {
    _inputLines.push(line);
});

_reader.on("close", solve);

function readNumber() {
    return Number(_inputLines[_currLine++]);
}

function readArrayOnNumbers() {
    return _inputLines[_currLine++].trim().split(' ').map(Number);
}

function solve() {

    const n = readNumber();
    const arr = readArrayOnNumbers();
    const k = readNumber();

    const answer = [];

    let sum = 0;
    for (let i = 0; i < k; i++) {
        sum = sum + arr[i];
    }
    answer.push(sum/k);

    if (n === k) {
        console.log(answer.join(' '));
        return;
    }

    let prevSum = sum;
    sum = 0;
    for (let i = 1; i <= n - k; i++) {
        sum = prevSum - arr[i-1] + arr[i+k-1];
        prevSum = sum;
        answer.push(sum/k);
    }

    console.log(answer.join(' '));
}