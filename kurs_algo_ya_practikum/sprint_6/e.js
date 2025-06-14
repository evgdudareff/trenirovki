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
let order = [];

function onLineListener(line) {
    if (lineNumber === 0) {
        [n, m] = line.split(' ').map(Number);
        colors = new Array(n).fill(-1);

    } else {
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

    }
    lineNumber++;
}

function DFS(v) {
    let stack = [];
    stack.push(v);

    while (stack.length > 0) {
        let curr = stack.pop();
        if (colors[curr - 1] === -1) {
            let coloredNeighbor = 0;

            if (nodeLinks.has(curr)) {
                let links = nodeLinks.get(curr);
                for (let link of links) {
                    let neighbor = colors[link - 1];
                    if (neighbor === -1) {
                        stack.push(link);
                    } else {
                        coloredNeighbor = neighbor;
                    }
                }
            }

            if (coloredNeighbor) {
                colors[curr - 1] = coloredNeighbor;
            } else {
                colors[curr - 1] = componentCount;
            }

        }
    }
}

let componentCount = 0;
function solve() {
    for (let i = 1; i <= n; i++) {
        if (colors[i - 1] === -1) {
            componentCount++;
            DFS(i);
        }
    }

    process.stdout.write(`${componentCount}\n`);
    let ansMap = new Map();
    for (let i = 0; i < colors.length; i++) {
        let vertex = i + 1;
        let colorCount = colors[i];
        if (!ansMap.has(colorCount)) {
            ansMap.set(colorCount, [vertex]);
        } else {
            let vertexes = ansMap.get(colorCount);
            vertexes.push(vertex);
            ansMap.set(colorCount, vertexes);
        }
    }

    for (let colorCount = 1; colorCount <= componentCount; colorCount++) {
        let vertexes = ansMap.get(colorCount);
        process.stdout.write(`${vertexes.sort((a,b) => a - b).join(' ')}\n`)
    }

}