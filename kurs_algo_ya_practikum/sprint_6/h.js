const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);


let n;
let m;
let lineNumber = 0;
let colors;
let nodeLinks = new Map();
let time = -1;
let entry = [];
let leave = [];

function onLineListener(line) {
    if (lineNumber === 0) {
        [n, m] = line.split(' ').map(Number);
        colors = new Array(n).fill('white');

    } else {
        let [u, v] = line.split(' ').map(Number);
        if (nodeLinks.has(u)) {
            let links = nodeLinks.get(u);
            links.push(v);
            nodeLinks.set(u, links);
        } else {
            nodeLinks.set(u, [v]);
        }

    }
    lineNumber++;
}

function DFS(v) {
    let stack = [];
    stack.push(v);

    while (stack.length > 0) {
        let curr = stack.pop();
        if (colors[curr - 1] === 'white') {
            colors[curr - 1] = 'grey';
            time++;
            entry[curr - 1] = time;
            stack.push(curr);

            if (nodeLinks.has(curr)) {
                let links = nodeLinks.get(curr).sort((a, b) => b - a);
                for (let link of links) {
                    if (colors[link - 1] === 'white') {
                        stack.push(link);
                    }
                }
            }

        } else if (colors[curr - 1] === 'grey') {
            colors[curr - 1] = 'black';
            time++;
            leave[curr - 1] = time;
        }
    }

}

function solve() {
    DFS(1);
    for (let i = 0; i < n; i++) {
        process.stdout.write(`${entry[i]} ${leave[i]}\n`)
    }
}