const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);


let n;
let lineNumber = 0;
let nodeLinks = new Map();

function onLineListener(line) {
    if (lineNumber === 0) {
        n = Number(line.split(' ')[0]);
        lineNumber++;
    } else {
        let [u, v] = line.split(' ');
        if (nodeLinks.has(u)) {
            let links = nodeLinks.get(u);
            nodeLinks.set(u, [...links, v]);
        } else {
            nodeLinks.set(u, [v]);
        }
    }
}

function solve() {
    for (let i = 1; i <= n; i++) {
        let u = String(i);
        if (nodeLinks.has(u)) {
            let links = nodeLinks.get(u).sort((a, b) => Number(a) - Number(b));
            process.stdout.write(`${links.length} ${links.join(' ')}\n`);
        } else {
            process.stdout.write('0\n');
        }
    }
}
