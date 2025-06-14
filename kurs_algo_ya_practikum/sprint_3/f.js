const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);


let n;
let ids;
let k;
const idsCount = {};
let lineNumber = 0;

function onLineListener (line) {
    if (lineNumber === 0) {
        n = Number(line);
    } else if (lineNumber === 1) {
        ids = line.split(' ').map((id) => {
            if (idsCount.hasOwnProperty(`${id}`)) {
                idsCount[id] += 1;
            } else {
                idsCount[id] = 1;
            }
            return id;
        });
    } else if (lineNumber === 2) {
        k = Number(line);
    }

    lineNumber++;
}


function solve() {


    const sorted = Object.keys(idsCount).sort((a, b) => {
        const isEqualCountOfStudents = idsCount[a] === idsCount[b];
        if (isEqualCountOfStudents) {
            return Number(a) - Number(b);
        } else {
            return idsCount[b] - idsCount[a];
        }
    })

    for (let i = 0; i < sorted.length && i < k; i++) {
        if (i !== 0) {
            process.stdout.write(' ');
        }
        process.stdout.write(`${sorted[i]}`);

    }


}
