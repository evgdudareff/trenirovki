const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let s;
let t;

let lineNumber = 0;

ioInterface.on('line', line => {
    if (lineNumber === 0) {
        s = line.split('').sort();
    } else {
        t = line.split('').sort();
    }

    lineNumber++;
});

ioInterface.on('close', solve);


function solve() {
    let ans;

    for (let i = 0; i < t.length && !ans; i++) {
        if (s[i] !== t[i]) {
            ans = t[i]
        }
    }

    process.stdout.write(ans);

}