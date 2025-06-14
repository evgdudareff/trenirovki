const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);


let n, m;
let a, b;
let dp = [];
let lineNumber = 0;

function onLineListener(line) {
    if (lineNumber === 0) {
        n = Number(line);
    } else if (lineNumber === 1) {
        a = line.split(' ').map(Number);
    } else if (lineNumber === 2) {
        m = Number(line);
    } else {
        b = line.split(' ').map(Number);
    }
    lineNumber++;
}

function solve() {
    const includedAIndexex = [];
    const includedBIndexex = [];

    for (let i = 0; i <= n; i++) {
        dp.push([]);

        let aChar;
        if (i !== 0) {
            aChar  = a[i - 1];
        }

        for (let j = 0; j <= m; j++) {
            if (i === 0 || j === 0) {
                dp[i][j] = 0;
                continue;
            }

            let bChar = b[j - 1];

            let prevMaxCommonSeq;
            if (aChar === bChar) {
                prevMaxCommonSeq = dp[i - 1][j - 1];
                dp[i][j] = prevMaxCommonSeq + 1;
            } else {
                let commonSeqIfAshorterB = dp[i - 1][j];
                let commonSeqIfBshorterA = dp[i][j - 1];
                prevMaxCommonSeq = Math.max(commonSeqIfAshorterB, commonSeqIfBshorterA);
                dp[i][j] = prevMaxCommonSeq;
            }
        }
    }

    // const maxCommonSeqWord = [];
    let i = n;
    let j = m;
    while (i !== 0 && j !== 0) {
            let aChar = a[i - 1];
            let bChar = b[j - 1];
            if (aChar === bChar) {
                // maxCommonSeqWord.push(aChar);
                includedAIndexex.push(i);
                includedBIndexex.push(j);
                i--;
                j--;
            } else {
                let topDpSeq = dp[i - 1][j];
                let currDpSeq = dp[i][j];
                if (currDpSeq === topDpSeq) {
                    i--;
                } else {
                    j--;
                }
            }
    }

    let maxCommonSeq = dp[n][m];
    // maxCommonSeqWord.reverse();
    process.stdout.write(`${maxCommonSeq}\n`);
    process.stdout.write(`${includedAIndexex.reverse().join(' ')}\n`);
    process.stdout.write(`${includedBIndexex.reverse().join(' ')}\n`);
}
