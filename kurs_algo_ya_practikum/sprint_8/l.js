const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);


let lineNumber = 0;
let s;

function onLineListener(line) {
    if (lineNumber === 0) {
        s = line;
    }
    lineNumber++;
}

function solve() {
    const pi = new Array(s.length).fill(0);

    for (let i = 1; i < s.length; i++) {
        let k = pi[i - 1];
        while(k > 0 && s[i] !== s[k]) {
            k = pi[k - 1];
        }

        if (s[i] === s[k]) {
            k++;
        }

        pi[i] = k;
    }

    process.stdout.write(pi.join(' '));

}
