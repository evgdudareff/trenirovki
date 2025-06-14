const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);


let n, k;
let prices;
let lineNumber = 0;

function onLineListener (line) {
    if (lineNumber === 0) {
        [n, k] = line.split(' ').map(Number);
        lineNumber++;
    } else {
        prices = line.split(' ').map(Number);
    }
}


function solve() {
    const sortedPrices = prices.sort((a, b) => a - b);
    let currSumm = 0;
    let ans = 0;

    for (let j = 0; j < n && currSumm <= k; j++) {
        currSumm = currSumm + sortedPrices[j];

        if (currSumm <= k) {
            ans++;
        }
    }

    process.stdout.write(`${ans}`);

}
