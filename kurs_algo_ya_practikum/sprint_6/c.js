const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);


let n;
let m;
let s;
let lineNumber = 0;
let colors;
let matrix = [];
let nodeLinks = new Map();

function onLineListener(line) {
    if (lineNumber === 0) {
        [n, m] = line.split(' ').map(Number);
        colors = new Array(n).fill('white');

    } else if (lineNumber <= m) {
        let [u, v] = line.split(' ').map(Number);
        if (nodeLinks.has(u)) {
            let links = nodeLinks.get(u);
            links.push(v);
            nodeLinks.set(u, links);
        } else {
            nodeLinks.set(u, [v]);
        }

        if (nodeLinks.has(v)) {
            let links = nodeLinks.get(v);
            links.push(u);
            nodeLinks.set(v, links);
        } else {
            nodeLinks.set(v, [u]);
        }

    } else {
        s = line;
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

            if (nodeLinks.has(curr)) {
                let links = nodeLinks.get(curr).sort((a, b) => b - a);
                for (let link of links) {
                    if (colors[link - 1] === 'white') {
                        stack.push(link);
                    }
                }
            }
            stack.push(curr);

        } else if (colors[curr - 1] === 'grey') {
            colors[curr - 1] = 'black';
            process.stdout.write(`${curr} `)
        }
    }

}

function solve() {
    DFS(Number(s));
}