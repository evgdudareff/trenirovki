const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);


let lineNumber = 0;
let n, numbers, m, pattern;

function onLineListener(line) {
    if (lineNumber === 0) {
        n = line;
    } else if (lineNumber === 1) {
        numbers = line.split(' ').map(Number);
    } else if (lineNumber === 2) {
        m = line;
    } else {
        pattern = line.split(' ').map(Number);
    }
    lineNumber++;
}

function solve() {

    function find(numbers, start = 0, pattern) {
        if (numbers.length < pattern.length) {
            return -1;
        }

        for (let pos = start; pos <= n - pattern.length; pos++) {
            let match = true;
            for (let offset = 0; offset < pattern.length; offset++) {
                if (numbers[pos + offset] !== pattern[offset]) {
                    match = false;
                    break;
                }
            }

            if (match === true) {
                return pos;
            }
        }

        return -1;
    }

    function findAll(numbers, start = 0, pattern) {
        let _start = start;
        const occurrences = [];

        while (true) {
            let pos = find(numbers, _start, pattern);
            if (pos === -1) {
                break;
            }
            occurrences.push(pos + 1);
            _start = pos + 1;
        }
        return occurrences;
    }

    const minNumber = Math.min(...numbers);
    const maxNumber = Math.max(...numbers);
    const minPattern = Math.min(...pattern);
    const maxPattern = Math.max(...pattern);

    const tuples = [];


    let c = 1;
    while (true) {
        let nextMinPattern = minPattern - c;
        if (nextMinPattern >= minNumber) {
            let newTuple = pattern.map((curr) => curr - c);
            tuples.push(newTuple);
        } else {
            break;
        }
        c++;
    }

    tuples.push(pattern);

    c = 1;
    while (true) {
        let nextMaxPattern = maxPattern + c;
        if (nextMaxPattern <= maxNumber) {
            let newTuple = pattern.map((curr) => curr + c);
            tuples.push(newTuple);
        } else {
            break;
        }
        c++;
    }

    let ans = [];

    for (let i = 0; i < tuples.length; i++) {
        let allPos = findAll(numbers, 0, tuples[i]);
        if (allPos.length) {
            ans = [...ans, ...allPos];
        }

    }

    process.stdout.write(`${ans.sort((a, b) => a - b).join(' ')}`);


}
