const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);


let n;
let colors;
let lineNumber = 0;

function onLineListener (line) {
    if (lineNumber === 0) {
        n = Number(line);
        lineNumber++;
    } else {
        colors = line.split(' ');
    }
}

function getArrayForCount(count, colorCode) {
    if (count === 0) {
        return [];
    }

    return new Array(count).fill(colorCode);
}


function solve() {
    const colorsCount = [0, 0, 0];

    for (let i = 0; i < n; i++) {
        const colorIndex = colors[i];
        colorsCount[colorIndex] = colorsCount[colorIndex] + 1;
    }

    const sortedColors = [
        ...getArrayForCount(colorsCount[0], 0),
        ...getArrayForCount(colorsCount[1], 1),
        ...getArrayForCount(colorsCount[2], 2),
    ];

    process.stdout.write(sortedColors.join(' '));

}
