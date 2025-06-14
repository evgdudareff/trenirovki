const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);


let n, m;
let lineNumber = 0;
const gold = [];

function onLineListener(line) {
    if (lineNumber === 0) {
        m = Number(line);
    } else if (lineNumber === 1) {
        n = Number(line);
    } else {
        gold.push(line.split(' ').map(Number));
    }
    lineNumber++;
}

function solve() {
    gold.sort((a,b) => {
        return a[0] - b[0];
    });

    let maxPrice = 0;
    let currWeight = 0;
    while (currWeight < m && gold.length) {
        let currGold = gold.pop();
        let currPrice = currGold[0]
        let currKiloCount = currGold[1];

        while (currWeight < m && currKiloCount !== 0) {
            currWeight = currWeight + 1;
            currKiloCount--;
            maxPrice = maxPrice + currPrice;
        }

    }

    process.stdout.write(`${maxPrice}`);


}
