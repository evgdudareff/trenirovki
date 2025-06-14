const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let axbc;

ioInterface.on('line', line => {
    axbc = line.split(' ').map(Number);
});

ioInterface.on('close', solve)


function solve() {
    const [a, x, b, c] = axbc;
    const y = a * x * x + b*x + c;

   process.stdout.write(`${y}`);
}