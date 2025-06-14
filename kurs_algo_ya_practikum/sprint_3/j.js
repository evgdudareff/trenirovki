const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);


let arr;
let n;
let lineNumber = 0;

function onLineListener (line) {
    if (lineNumber === 0) {
        n = Number(line);
    } else if (lineNumber === 1) {
        arr = line.split(' ').map(Number);
    }
    lineNumber++;
}


function solve() {
    let isInitiallySorted = true;

    for (let i = 0; i < arr.length - 1; i++) {
        let changed = false;
        for (let j = 0; j < arr.length - 1; j++) {
            const curr = arr[j];
            const next = arr[j + 1];
            if (next < curr) {
                arr[j + 1] = curr;
                arr[j] = next;
                changed = true;
                if (isInitiallySorted) {
                    isInitiallySorted = false;
                }
            }
        }
        if (changed) {
            process.stdout.write(`${arr.slice().join(' ').toString()}\n`);
        }
    }

    if (isInitiallySorted) {
        process.stdout.write(arr.join(' ').toString());
    }
}
