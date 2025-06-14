const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);


let n;
const dp = [1, 1];

function onLineListener(line) {
    n = Number(line);
}

function byModule(n) {
    return n % (Math.pow(10, 9) + 7);
}

function solve() {
    let fib = 0;

    if (n < 2) {
        fib = dp[n];
    } else {
        for (let i = 2; i <= n; i++) {
            dp[i] = byModule(dp[i - 1] + dp[i - 2]);
        }
        fib = dp[n];
    }

    process.stdout.write(`${fib}`);
}
