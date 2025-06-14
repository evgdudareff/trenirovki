const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);


let n;
let lineNumber = 0;
const timeTable = [];

function onLineListener(line) {
    if (lineNumber === 0) {
        n = Number(line);
    } else {
        timeTable.push(line.split(' ').map(Number));
    }
    lineNumber++;
}

function solve() {
    let bestTimeTable = [];

    timeTable.sort((a,b) => {
        let startA = a[0];
        let endA = a[1];
        let startB = b[0];
        let endB = b[1];

        if (endB > endA) {
            return -1;
        } else if (endB < endA) {
            return 1;
        }

        if (startB > startA) {
            return -1;
        } else if (startB <= startA) {
            return 1;
        }

    });
    let startTime = timeTable.length ? timeTable[0][0] : 0;
    for (let i = 0; i < n; i++) {
        let candidateStart = timeTable[i][0];

        if (candidateStart >= startTime) {
            let candidateEnd = timeTable[i][1];
            bestTimeTable.push([candidateStart, candidateEnd]);
            startTime = candidateEnd;
        }
    }


    process.stdout.write(`${bestTimeTable.length}\n`);
    for (let time of bestTimeTable) {
        process.stdout.write(`${time.join(' ')}\n`);
    }

}
