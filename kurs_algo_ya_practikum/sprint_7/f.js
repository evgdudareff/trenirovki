const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);


let n, k;

function onLineListener(line) {
    [n, k] = line.split(' ').map(Number);
}

function solve() {
    let dp = [0, 1];

    for (let i = 2; i <= n; i++) {
        let possibleMoves = 0;
        let step = k;
        for (let j = i; step > 0; step--) {
            if (j - step > 0) {
                possibleMoves += dp[j - step] ;
            }
        }
        dp[i] = possibleMoves % (Math.pow(10, 9) + 7);
    }

    let ans = dp[n] ;

    process.stdout.write(`${ans}`);


}
