const readline = require('readline');
//
// const ioInterface = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });
// ioInterface.on('line', onLineListener);
// ioInterface.on('close', solve);


let n, m, nNumbers, mNumbers;

let lineNumber = 0;

function onLineListener (line) {
    if (lineNumber === 0) {
        n = Number(line);
    } else if (lineNumber === 1) {
        m = Number(line)
    } else if (lineNumber === 2) {
        nNumbers = line.split(' ').map(Number);
    } else if (lineNumber === 3) {
        mNumbers = line.split(' ').map(Number);
    }

    lineNumber++;
}


function findNearestToMean(arr, desirableLeft, desirableRight) {
    if (arr.length === 1) {
        return arr[0];
    }

    if (arr.length === 2) {
        return (arr[0] + arr[1]) / 2;
    }

    let bestMean = (desirableRight + desirableLeft) / 2;
    let l = 0;
    let r = arr.length - 1;

    while (l < r) {
        let mid = Math.floor((l + r) / 2 );
        let curr = arr[mid];

        if (curr <= desirableLeft) {
            l = mid + 1;
        } else if (curr >= desirableRight) {
            r = mid;
        } else {
            let eps = Math.abs(curr - bestMean);
            if (eps <= 0.5) {
                break;
            } else {
                l = mid + 1;
            }
        }
    }

    return (arr[l] + arr[r]) / 2;
}

function test1() {
    const test1 = [0, 0, 0, 1, 3, 3, 5, 10];
    const res1 = findNearestToMean(test1, 2, 7);

    const test2 = [4, 4, 5, 7, 7, 7, 8, 9, 9, 10];
    const res2 = findNearestToMean(test2, 2, 7);

    const ans = (res1 + res2) / 2;

    console.log(`${ans}`);
}

function test2() {
    const test1 = [1, 2];
    const res1 = findNearestToMean(test1, 1.5, 3.5);

    const test2 = [3, 4];
    const res2 = findNearestToMean(test2, 1.5, 3.5);

    const ans = (res1 + res2) / 2;

    console.log(`${ans}`);
}

function test3() {
    const test1 = [1, 3];
    const res1 = findNearestToMean(test1, 2, 2);

    const test2 = [2];
    const res2 = findNearestToMean(test2, 2, 2);

    const ans = (res1 + res2) / 2;

    console.log(`${ans}`);
}

test1();