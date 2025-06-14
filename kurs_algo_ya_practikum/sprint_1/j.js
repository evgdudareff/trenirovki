const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


let number;

ioInterface.on('line', line => {
    number = Number(line);
});

ioInterface.on('close', solve);


function solve() {
    let primes = [];
    let div = 2;

    while (number >= 2) {
        if (number % div === 0) {
            primes.push(div);
            number = number / div;
        } else {
            div++;
        }
    }


    process.stdout.write(primes.sort((a, b) => a - b).join(' '));

}