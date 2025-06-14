const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);

let s;
let n;
let arr;
let lineNumber = 0;


function onLineListener (line) {
    if (lineNumber === 0) {
        n = Number(line);
    } else if (lineNumber === 1) {
        s = Number(line);
    } else {
        arr = line.split(' ').map(Number);
    }
    lineNumber++;
}

function comporator(a,b) {
    const [a1, a2, a3, a4] = a.split(' ').map(Number);
    const [b1, b2, b3, b4] = b.split(' ').map(Number);

    if (a1 > b1) {
        return 1;
    } else if (a1 < b1) {
        return -1;
    }

    if (a2 > b2) {
        return 1;
    } else if (a2 < b2) {
        return -1;
    }

    if (a3 > b3) {
        return 1;
    } else if (a3 < b3) {
        return -1;
    }

    if (a4 > b4) {
        return 1;
    } else if (a4 < b4) {
        return -1;
    }

    return 0;
}

function solve() {
    const answers = new Set();
    const historyOf2sum = new Map();
    const sorted = arr.sort((a,b) => a - b);

    for (let i = 0; i < n - 1; i++) {
        for (let j = i + 1; j < n; j++) {
            let sum = sorted[i] + sorted[j];
            historyOf2sum.set(sum, [i, j])
        }
    }


    for (let i = 0; i < n - 1; i++) {
        for (let j = i + 1; j < n; j++) {
            let target = s - sorted[j] - sorted[i];
            if (historyOf2sum.has(target)) {
                let [pairI, pairJ] = historyOf2sum.get(target);
                if (i !== pairI && i !== pairJ && j !== pairI && j !== pairJ) {
                    let arr = [sorted[i], sorted[j], sorted[pairJ], sorted[pairI]].sort((a, b) => a - b);
                    answers.add(arr.join(' '));
                }
            }
        }
    }

    process.stdout.write(`${answers.size}\n`);

    [...answers].sort(comporator).forEach((answer) => {
        process.stdout.write(`${answer}\n`);
    })

}

