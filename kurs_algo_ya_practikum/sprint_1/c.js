const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let matrix = [];
let n;
let m;
let goalX;
let goalY;
let lineIndex = 0;

ioInterface.on('line', line => {
    if (lineIndex === 0) {
        n = Number(line);
    } else if (lineIndex === 1) {
        m = Number(line)
    } else if (lineIndex - 2 < n) {
        matrix.push(line.split(' '))
    } else if (goalX === undefined) {
        goalX = Number(line);
    } else {
        goalY = Number(line);
    }
    lineIndex++;
});

ioInterface.on('close', solve)

function getTopNeighbor(goalI,goalJ) {
    if (goalI === 0) {
        return '';
    }
    return matrix[goalI - 1][goalJ];
}

function getBottomNeighbor(goalI,goalJ) {
    if (goalI === n - 1) {
        return '';
    }
    return matrix[goalI + 1][goalJ];
}

function getRightNeighbor(goalI,goalJ) {
    if (goalY === m - 1) {
        return '';
    }
    return matrix[goalI][goalJ + 1];
}

function getLeftNeighbor(goalI,goalJ) {
    if (goalY === 0) {
        return '';
    }
    return matrix[goalI][goalJ - 1];
}

function solve() {
    const answer = [];
    const top = getTopNeighbor(goalX, goalY);
    const bottom = getBottomNeighbor(goalX, goalY);
    const right = getRightNeighbor(goalX, goalY);
    const left = getLeftNeighbor(goalX, goalY);

    top && answer.push(Number(top));
    bottom && answer.push(Number(bottom));
    right && answer.push(Number(right));
    left && answer.push(Number(left));

    process.stdout.write(answer.sort((a,b) => a - b).join(' '));
}