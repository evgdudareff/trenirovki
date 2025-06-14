const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);


let s, t;
let dp = [];
let lineNumber = 0;

function onLineListener(line) {
    if (lineNumber === 0) {
        s = line.split('');
        lineNumber++;
    } else  {
        t = line.split('');
    }
}

function solve() {

    for (let i = 0; i <= s.length; i++) {
        dp.push([]);

        let sChar;
        if (i !== 0) {
            sChar  = s[i - 1];
        }

        for (let j = 0; j <= t.length; j++) {
            if (i === 0 || j === 0) {
                dp[i][j] = 0;
                continue;
            }

            let tChar = t[j - 1];

            let prevMaxCommonSeq;
            if (sChar === tChar) {
                prevMaxCommonSeq = dp[i - 1][j - 1];
                dp[i][j] = prevMaxCommonSeq + 1;
            } else {
                let commonSeqIfSshorterT = dp[i - 1][j];
                let commonSeqIfTshorterS = dp[i][j - 1];
                prevMaxCommonSeq = Math.max(commonSeqIfSshorterT, commonSeqIfTshorterS);
                dp[i][j] = prevMaxCommonSeq;
            }
        }
    }

    const includedSIndexex = [];
    const includedTIndexex = [];
    const maxCommonSeqWord = [];
    let i = s.length;
    let j = t.length;
    while (i !== 0 && j !== 0) {
        let sChar = s[i - 1];
        let tChar = t[j - 1];
        if (sChar === tChar) {
            maxCommonSeqWord.push(sChar);
            includedSIndexex.push(i);
            includedTIndexex.push(j);
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
    // 4
    // 6
    includedSIndexex.reverse();
    includedTIndexex.reverse();
    let maxCommonSeq = dp[s.length][t.length];
    const sAndTDiff = Math.abs(s.length - t.length);
    process.stdout.write(`${sAndTDiff + maxCommonSeq}\n`);
    process.stdout.write(`${maxCommonSeqWord.reverse().join('')}\n`);
}
