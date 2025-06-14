// https://contest.yandex.ru/contest/22450/run-report/134988035/
const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let n;
let houseNumbers;
let lineNumber = 0;

ioInterface.on('line', line => {
    if (lineNumber === 0) {
        n = Number(line);
    } else {
        houseNumbers = line.split(' ').map(Number);
    }
    lineNumber++;
});

ioInterface.on('close', solve);


function getEmptyNeighbor(currHouseIndex, left = true, emptyNeighbors) {
    if (houseNumbers[currHouseIndex] === 0) {
        return 0;
    }

    const arrBoundaryIndex = left ? 0 : n - 1;
    if (currHouseIndex === arrBoundaryIndex) {
        return Number.MAX_SAFE_INTEGER;
    }

    const neighborNearestEmpty = left ? emptyNeighbors[currHouseIndex - 1] : emptyNeighbors[arrBoundaryIndex - currHouseIndex - 1];
    if (neighborNearestEmpty === Number.MAX_SAFE_INTEGER) {
        return neighborNearestEmpty;
    }  else {
        return neighborNearestEmpty + 1;
    }
}


function solve() {
    const leftEmptyNeighbors = [];
    const rightEmptyNeighbors = []; //reversed order

    const rightBoundary = n - 1;
    for (let i = 0, j = rightBoundary; i <= rightBoundary && j >= 0; i++, j--) {
        let currLeftEmptyNeighbor = getEmptyNeighbor(i, true, leftEmptyNeighbors);
        let currRightEmptyNeighbor = getEmptyNeighbor(j, false, rightEmptyNeighbors);

        leftEmptyNeighbors.push(currLeftEmptyNeighbor);
        rightEmptyNeighbors.push(currRightEmptyNeighbor);
    }

    let answer = '';
    for (let k = 0; k <= rightBoundary; k++){
        answer += ` ${Math.min(leftEmptyNeighbors[k], rightEmptyNeighbors[rightBoundary - k])}`;
    }
    answer = answer.trim();

    process.stdout.write(answer);

}