const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);


let lineNumber = 0;
let a, b;

function onLineListener(line) {
    if (lineNumber === 0) {
        a = line;
    } else if (lineNumber === 1) {
        b = line;
    }
    lineNumber++;
}

function solve() {
    let s = '';
    for (let i = 0; i < a.length; i++) {
        if (a[i].charCodeAt(0) % 2 === 0) {
            s += a[i];
        }
    }

    let t = '';
    for (let i = 0; i < b.length; i++) {
        if (b[i].charCodeAt(0) % 2 === 0) {
            t += b[i];
        }
    }

    if (s === t) {
        process.stdout.write('0');
    } else if (s < t) {
        process.stdout.write('-1');
    } else {
        process.stdout.write('1');
    }

}
