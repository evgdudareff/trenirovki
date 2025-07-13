const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);


let lineNumber = 0;
let words;

function onLineListener(line) {
    if (lineNumber === 0) {
        words = line.split(' ').reverse();
        lineNumber++;
    }
}

function solve() {
    for (let i = 0; i < words.length; i++) {
        process.stdout.write(`${words[i]} `);
    }

}
