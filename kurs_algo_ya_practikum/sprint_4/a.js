const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);

let n;
const sections = {};
let lineNumber = 0;
function onLineListener (line) {
    if (lineNumber === 0) {
        n = Number(line);
    } else {
        if (!sections[line]) {
            sections[line] = true;
        }
    }
    lineNumber++;
}


function solve() {
    Object.keys(sections).forEach((name) => {
            process.stdout.write(`${name}\n`);
    })
}

