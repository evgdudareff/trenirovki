const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});



let lineNumber = 0;
let n;
let m;
const matrix = [];

ioInterface.on('line', line => {
    if (lineNumber === 0) {
        n = Number(line);
    } else if (lineNumber === 1) {
        m = Number(line);
    } else {
        matrix.push(line.split(' '));
    }
    lineNumber++;
});

ioInterface.on('close', solve);


function solve(){
    let ans = ''
    for (let j = 0; j < m; j++) {
        for (let i = 0; i < n; i++) {
            ans += `${matrix[i][j]} `;
        }
        ans.trim();
        ans += '\n'
        process.stdout.write(ans);
        ans = '';
    }

    // process.stdout.write(ans);
}

