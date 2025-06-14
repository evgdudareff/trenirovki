const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


let lineIndex = 0;
let l;
let text;

ioInterface.on('line', line => {
    if (lineIndex === 0) {
        l = Number(line);
    } else {
        text = line.split(' ');
    }
    lineIndex++;
});

ioInterface.on('close', solve)

function solve() {
    let answerWord = '';
    let answerWordLength = 0;

    for (let i = 0; i < text.length; i++) {
        const currWord = text[i];
        const currWordLength = currWord.length;

        if (currWordLength > answerWordLength) {
            answerWord = currWord;
            answerWordLength = currWordLength;
        }

    }
    process.stdout.write(`${answerWord}\n`);
    process.stdout.write(String(answerWordLength));

}