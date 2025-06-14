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
    const arr1 = readArrayOnNumbers();
    const arr2 = readArrayOnNumbers();

    const answer = [];
    for (let i = 0; i < n; i++) {
        answer.push(arr1[i], arr2[i]);
    }

    console.log(answer.join(' '));
}