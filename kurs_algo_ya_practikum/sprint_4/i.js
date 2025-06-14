const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);

let n;
let hashMap = new Map();
let lineNumber = 0;


function onLineListener (line) {
    if (lineNumber === 0) {
        n = Number(line);
        lineNumber++;
    } else {
        line.split(' ').forEach((word, i) => {
            let hash = [...word].sort().join('');
            if (hashMap.has(hash)) {
                let currArrOfAnagramIdx = hashMap.get(hash);
                currArrOfAnagramIdx.push(i);
            } else {
                hashMap.set(hash, [i]);
            }
        })
    }

}

function comporator(aIdxArr,bIdxArr) {
//     mutate idxArr right here
    aIdxArr.sort((a, b) => a - b);
    bIdxArr.sort((a, b) => a - b);

    return aIdxArr[0] - bIdxArr[0];
}

function solve() {
    const answers = [...hashMap.values()];

    answers.sort(comporator).forEach((answer) => {
        process.stdout.write(`${answer.join(' ')}\n`);
    })

}

