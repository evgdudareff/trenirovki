const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);


let n;
let lineNumber = 0;
let matrix = [];

function onLineListener(line) {
    if (lineNumber === 0) {
        n = Number(line.split(' ')[0]);
        for (let i = 0; i < n; i++) {
            matrix.push(new Array(n).fill(0));
        }
        lineNumber++;
    } else {
        let [u, v] = line.split(' ');
        matrix[u - 1][v - 1] = 1;
    }
}

function solve() {
    for (let i = 0; i < n; i++) {
        process.stdout.write(`${matrix[i].join(' ')}\n`);
    }
}
