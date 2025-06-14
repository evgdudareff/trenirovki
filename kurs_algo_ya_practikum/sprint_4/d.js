const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);

let a;
let m;
let s;
let lineNumber = 0;


function onLineListener (line) {
    if (lineNumber === 0) {
        a = Number(line);
    } else if (lineNumber === 1){
        m = Number(line);
    } else {
        s = line;
    }
    lineNumber++;
}

// 1000
// 123987123
// ab

function solve() {
    if (!s) {
        process.stdout.write(`0`);
        return;
    }

    let ans = 0;
    let prev = 0;
    for (let i = 0; i < s.length - 1; i++) {
        prev = ((s[i].charCodeAt(0) + prev) * a) % m;
    }
    prev +=  s[s.length - 1].charCodeAt(0);
    ans = prev % m;

    process.stdout.write(`${ans}`);
}


