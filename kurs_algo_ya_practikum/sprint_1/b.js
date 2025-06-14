const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let abc;

ioInterface.on('line', line => {
    abc = line.split(' ').map(Number);
});

ioInterface.on('close', solve)

function isOdd(n) {
    return n % 2 === 0;
}

function solve() {
    let answer = 'FAIL';
    const [a, b, c] = abc;
    const isAodd = isOdd(a);
    const isBodd = isOdd(b);
    const isCodd = isOdd(c);


    if ((isAodd && isBodd && isCodd) || (!isAodd && !isBodd && !isCodd)) {
        answer = 'WIN';
    }

    process.stdout.write(answer);
}