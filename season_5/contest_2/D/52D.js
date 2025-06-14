// https://contest.yandex.ru/contest/59540/problems/D/

const { createInterface } = require("readline");

// let test = [];

function makeBoard(){
    let board = [];
    for (let i = 0; i < 8; i++){
        board.push([]);
        for (let j = 0; j < 8; j++){
            board[i][j] = null;
        }
    }
    return board;
}

function solveTestCase(test){
    let res = 0;
    const n = Number(test[0]);
    const board = makeBoard();

    const numbers = test.slice(1).map((pair) => {
        const pairArr =  pair.split(' ');
        let x = Number(pairArr[0]) - 1;
        let y = Number(pairArr[1]) - 1;
        board[x][y] = 1;
    });

    const dX = []

    for (let i = 0; i < 8; i++){
        for (let j = 0; j < 8; j++){
            if (board[i][j] === 1) {
                if (!board[i]?.[j - 1]) {
                    res = res + 1;
                }

                if (!board[i - 1]?.[j]) {
                    res = res + 1;
                }

                if (!board[i]?.[j + 1]) {
                    res = res + 1;
                }

                if (!board[i + 1]?.[j]) {
                    res = res + 1;
                }
            };
        }
    }

    console.log(res);

}

// solveTestCase(test);




const lines = [];
createInterface({
    input: process.stdin,
    output: process.stdout,
}).on("line", (line) => {
    lines.push(line.toString().trim());
}).on("close", () => {
    solveTestCase(lines);
});
