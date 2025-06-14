const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);


let n;
let arrOfArr = [];
let lineNumber = 0;

function onLineListener (line) {
    if (lineNumber === 0) {
        n = line;
        lineNumber++;
    } else {
        arrOfArr.push(line.split(' ').map(Number));
    }
}


function solve() {
    const sortedArrOfArr = arrOfArr.sort((a, b) => {
        const startA = a[0];
        const startB = b[0];
        return startA - startB;
    });

    if (sortedArrOfArr.length === 1) {
        process.stdout.write(sortedArrOfArr[0].join(' '));
        return;
    }

    let curr = sortedArrOfArr[0];
    for (let i = 0; i < sortedArrOfArr.length - 1; i++) {
        const next = sortedArrOfArr[i + 1];
        const currStart = curr[0];
        const currEnd = curr[1];
        const nextStart = next[0];
        const nextEnd = next[1];

        if (currEnd >= nextStart) {
            curr = [currStart, Math.max(currEnd, nextEnd)];
        } else {
            process.stdout.write(`${curr[0]} ${curr[1]}\n`);
            curr = next;
        }

    }

    if (curr.length) {
        process.stdout.write(`${curr[0]} ${curr[1]}`);
    }

}
