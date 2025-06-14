const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


const leftBrackets = {
    '{': '{',
    '[': '[',
    '(': '(',
}

const rightBrackets = {
    '}': '}',
    ']': ']',
    ')': ')',
}

function isPair(left, right) {
    return (left === leftBrackets["{"] && right === rightBrackets["}"])
        || (left === leftBrackets["["] && right === rightBrackets["]"])
        || (left === leftBrackets["("] && right === rightBrackets[")"])
}


const stack = [];
let brackets;

ioInterface.on('line', line => {
    brackets = line.split('');
});

ioInterface.on('close', solve);


function solve() {
    let answer = 'True';

    for (let i = 0; i <= brackets.length - 1; i++) {
        const currBracket = brackets[i];
        if (leftBrackets[currBracket]) {
            stack.push(currBracket);
        } else if (rightBrackets[currBracket]) {
            const topStackRightBracket = stack.pop();
            if (!isPair(topStackRightBracket, currBracket)) {
                answer = 'False';
                break;
            }
        }
    }

    if (stack.length) {
        answer = 'False';
    }


    process.stdout.write(answer);
}

