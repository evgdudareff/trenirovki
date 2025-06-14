const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);


let n;
let m;
let nArr;
let mArr;
let lineNumber = 0;

function onLineListener (line) {
    if (lineNumber === 0) {
        n = Number(line);
    } else if (lineNumber === 1) {
        nArr = line.split(' ').map(Number);
    } else if (lineNumber === 2) {
        m = Number(line);
    } else if (lineNumber === 3) {
        mArr = line.split(' ').map(Number);
    }
    lineNumber++;
}


function solve() {
    const nArrSorted = nArr.sort((a, b) => a - b);
    const mArrSorted = mArr.sort((a, b) => a - b);

    let i = 0;
    let j = 0;
    let ans = 0;

    while (i < n && j < m) {
        if (nArrSorted[i] <= mArrSorted[j]) {
            i++;
            ans++;
        }
        j++;
    }

    process.stdout.write(String(ans));

}

// 2
// 5 5
// 3
// 1 5 5