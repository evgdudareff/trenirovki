const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);


let numbers;
const answers = [];
const chars = {
    2:'abc',
    3:'def',
    4:'ghi',
    5:'jkl',
    6:'mno',
    7:'pqrs',
    8:'tuv',
    9:'wxyz'
}

function onLineListener (line) {
    numbers = line.split('');
}


function makeCombination(str, arr, n) {
    if (n === arr.length) {
        answers.push(str);
        return;
    }

    const nextStr = chars[arr[n]];
    for (let i = 0; i <= nextStr.length - 1; i++) {
        makeCombination(str + nextStr[i], arr, n + 1)
    }
}

function solve() {
    if (numbers.length === 0) {
        process.stdout.write('');
        return;
    }

    makeCombination('', numbers, 0)
    answers.sort();

    for (let i = 0; i <= answers.length - 1; i++) {
        const isLast = i === answers.length - 1;
        process.stdout.write(`${answers[i]}${isLast ? '' : ' '}`);
    }

}
