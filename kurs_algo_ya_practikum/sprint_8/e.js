const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);


let lineNumber = 0;
let word, n;

function onLineListener(line) {
    if (lineNumber === 0) {
        word = line.split('');
    } else if (lineNumber === 1) {
        n = line;
    } else {
        const [addWord, pos] = line.split(' ');
        if (pos <= 0) {
            word[0] = `${addWord}${word[0]}`;
        } else if (pos >= word.length) {
            word[word.length - 1] = `${word[word.length - 1]}${addWord}`;
        } else {
            word[pos] = `${addWord}${word[pos]}`;
        }
    }
    lineNumber++;
}

function solve() {
    process.stdout.write(word.join(''))
}
