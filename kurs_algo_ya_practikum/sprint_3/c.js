const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);


let s;
let t;
let lineNumber = 0;

function onLineListener (line) {
    if (lineNumber === 0) {
        s = line;
    } else if (lineNumber === 1) {
        t = line;
    }
    lineNumber++;
}


function solve() {
    const sLength = s.length;
    const tLength = t.length;

    if (tLength < sLength) {
        process.stdout.write('False');
        return;
    }

    let i = 0;
    let j = 0;

    while (j < tLength && i < sLength) {
        let sChar = s[i];
        let tChar = t[j];

        if (sChar === tChar) {
            i++;
            j++;
        } else {
            j++;
        }
    }

    if (i === sLength) {
        process.stdout.write('True');
    } else {
        process.stdout.write('False');
    }


}
