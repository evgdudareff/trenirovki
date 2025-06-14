const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);


let n;
let prices;
let lineNumber = 0;
let nodeLinks = new Map();

function onLineListener(line) {
    if (lineNumber === 0) {
        n = Number(line);
        lineNumber++;
    } else {
        prices = line.split(' ').map(Number);
    }
}

function solve() {
    let maxSum = 0;

    let r = 1;
    let lastProfit = 0;
    for (let l = 0; l < n - 1 && r <= n; ) {
        let buy = prices[l];
        let sell = prices[r] || 0;
        let currProfit = sell - buy;

        if (currProfit < lastProfit) {
            if (lastProfit === 0) {
                l = l + 1;
                r = l + 1;
            } else {
                maxSum = maxSum + lastProfit;
                l = r - 1;
                r = l + 1;
                lastProfit = 0;
            }
        } else {
            lastProfit = currProfit;
            r = r + 1;
        }
    }

    process.stdout.write(`${maxSum}`);
}
