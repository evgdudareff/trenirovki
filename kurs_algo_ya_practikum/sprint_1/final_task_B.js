// https://contest.yandex.ru/contest/22450/run-report/134987684/
const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let k;
let lineNumber = 0;
const possibleRounds = {};

ioInterface.on('line', line => {
    if (lineNumber === 0) {
        k = Number(line);
    } else {
        line.split('').forEach((digit) => {
            if (digit !== '.') {
                const currDigitCount = possibleRounds[digit];
                if (currDigitCount) {
                    possibleRounds[digit] = Number(currDigitCount) + 1;
                } else {
                    possibleRounds[digit] = 1;
                }
            }
        });
    }
    lineNumber++;
});

ioInterface.on('close', solve);



function solve() {
    if (!Object.keys(possibleRounds).length) {
        process.stdout.write('0');
        return;
    }

    let answer = 0;
    const K = 2*k;
    for (let i = 1; i <= 9; i++) {
        const possibleRoundDigitAvailable = possibleRounds[i];
        if (possibleRoundDigitAvailable &&  possibleRoundDigitAvailable <= K) {
            answer++;
        }
    }

    process.stdout.write(String(answer));
}


