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

    const numbers = {}
    arr.forEach((number) => {
        if (!numbers[number]) {
            numbers[number] = numbers[number] ? numbers[number] + 1 : 0;
        }
    })

    let stop = false;
    for(let i = 0; i < n && !stop; i++) {
        const number = arr[i];
        const proposal = k - number;
        const areSameNumber = proposal === number;
        if ((areSameNumber && numbers[proposal] > 0 )|| (!areSameNumber && numbers[proposal] >=0 )) {
            console.log(number, proposal);
            stop = true;
        }
    }

    if (stop) {
        return;
    }


    console.log('None');
}