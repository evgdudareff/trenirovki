const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);


let arr;
let n;
let lineNumber = 0;

function onLineListener (line) {
    if (lineNumber === 0) {
        n = Number(line);
    } else if (lineNumber === 1) {
        arr = line.split(' ').map(Number);
    }
    lineNumber++;
}

function numberFromStr(a, b){
    return Number(`${a}${b}`);
}


function solve() {
    const sorted = arr.sort((a, b) => {
        const variantAb = numberFromStr(a, b);
        const variantBa = numberFromStr(b, a);
        return variantBa - variantAb;
    })

    process.stdout.write(sorted.join('').toString());

}
