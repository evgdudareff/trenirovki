const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);


let n, m;
let field = [];
let lineNumber = 0;

function onLineListener(line) {
    if (lineNumber === 0) {
        [n, m] = line.split(' ').map(Number);
        lineNumber++;
    } else {
        field.push(line.split('').map(Number));
    }
}

function solve() {
    const moves = [];

    for (let i = n - 1; i >= 0; i--) {
        for (let j = 0; j < m; j++) {
            let fromLeftMove = j === 0 ? 0 : field[i][j - 1];
            let fromDownMove = i === n - 1 ? 0 : field[i + 1][j];
            let maxFromSideMoves = Math.max(fromDownMove, fromLeftMove);
            let currCell = field[i][j];
            field[i][j] = currCell + maxFromSideMoves;
        }
    }

    let i = 0;
    let j = m - 1;
    while (j !== 0 || i !== n -1) {
        let fromLeftMove = j === 0 ? Number.MIN_SAFE_INTEGER : field[i][j - 1];
        let fromDownMove = i === n - 1 ? Number.MIN_SAFE_INTEGER : field[i + 1][j];
        if (fromLeftMove > fromDownMove) {
            moves.push('R');
            j--;
        } else {
            i++;
            moves.push('U');
        }
    }


    let ans = field[0][m - 1];
    process.stdout.write(`${ans}\n`);
    process.stdout.write(`${moves.reverse().join('')}`);


}
