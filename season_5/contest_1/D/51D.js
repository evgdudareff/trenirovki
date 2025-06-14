// https://contest.yandex.ru/contest/59539/problems/D/

const { createInterface } = require("readline");

// класс, описывающий ячейку поля
class Cell {
    i = 0;
    j = 0;
    canBeHitted = false;
    isHitted = false;
    upNode = null;
    upRightNode = null;
    rightNode = null;
    downRightNode = null;
    downNode = null;
    downLeftNode = null;
    leftNode = null;
    upLeftNode = null;
    figureType = null;

    constructor(i, j) {
        this.i = i;
        this.j = j;
    }

    hasUpNode(){
        return this.upNode !== null;
    }

    hasUpRightNode(){
        return this.upRightNode !== null;
    }

    hasRightNode(){
        return this.rightNode !== null;
    }

    hasDownRightNode(){
        return this.downRightNode !== null;
    }

    hasDownNode(){
        return this.downNode !== null;
    }

    hasDownLeftNode(){
        return this.downLeftNode !== null;
    }

    hasLeftNode(){
        return this.leftNode !== null;
    }

    hasUpLeftNode(){
        return this.upLeftNode !== null;
    }

    toString(){
        return ` ${this.i}-${this.j} `
    }


}

// игровое поле, состоящее из ячеек cell
class Table {
    cells = [];

    addLine(line){
        this.cells.push(line);
    }

    getCellByCoords(x,y){
        if (x === null || y === null){
            return null;
        }
        return this.cells[x][y];
    }

    toString(){
        const snapShot = this.cells.map((line, i) => {
            const lineCells = line.map((cell) => `${cell}`).toString();
            return lineCells;
        })
        return snapShot;
    }
}

function isFigure(char){
    return ['R', 'B'].includes(char);
}

function makeTable(lines) {
    const figuresCoordsArr = [];
    const table = new Table();

    // создать игровое поле, заполнив каждую клетку классом-ячейкой
    for (let i = 0; i < 8; i++){
        const cellMappedLine = [];

        for (let j = 0; j < 8; j++) {
            const char = lines[i][j];
            const cell = new Cell(i, j);

            if (isFigure(char)){
                cell.canBeHitted = false;
                cell.figureType = char;
                figuresCoordsArr.push({x: i, y: j});
            } else {
                cell.canBeHitted = true;
            }


            if (i !== 0) {
                cell.upNode = {x: i - 1, y: j};
            }

            if (i !== 0 && j !== 7) {
                cell.upRightNode = {x: i - 1, y: j + 1};
            }

            if (j !== 7) {
                cell.rightNode = {x: i, y: j + 1};
            }

            if (i!== 7 && j !== 7) {
                cell.downRightNode = {x: i + 1, y: j + 1};
            }

            if (i !== 7) {
                cell.downNode = {x: i + 1, y: j};
            }

            if (i !== 7 && j!== 0) {
                cell.downLeftNode = {x: i + 1, y: j - 1};
            }

            if (j !== 0) {
                cell.leftNode = {x: i, y: j - 1};
            }

            if (i !== 0 && j!== 0) {
                cell.upLeftNode = {x: i - 1, y: j - 1};
            }


            cellMappedLine.push(cell);
        }

        table.addLine(cellMappedLine);

    }

    return {table, figuresCoordsArr};
}

function moveRFigure(currFigure, table){
    let hittedCount = 0;

    let nextleftNode = currFigure.hasLeftNode() ? table.getCellByCoords(currFigure.leftNode.x, currFigure.leftNode.y) : null;
    let nextRightNode = currFigure.hasRightNode() ? table.getCellByCoords(currFigure.rightNode.x, currFigure.rightNode.y) : null;
    let nextUpNode = currFigure.hasUpNode() ? table.getCellByCoords(currFigure.upNode.x, currFigure.upNode.y) : null;
    let nextDownNode = currFigure.hasDownNode() ? table.getCellByCoords(currFigure.downNode.x, currFigure.downNode.y) : null;

    while (nextUpNode !== null && nextUpNode.canBeHitted) {
        if (!nextUpNode.isHitted) {
            nextUpNode.isHitted = true;
            hittedCount++;
        }

        if (nextUpNode.hasUpNode()) {
            nextUpNode = table.getCellByCoords(nextUpNode.upNode.x, nextUpNode.upNode.y);
        } else {
            nextUpNode = null;
        }

    }

    while (nextDownNode !== null && nextDownNode.canBeHitted) {
        if (!nextDownNode.isHitted) {
            nextDownNode.isHitted = true;
            hittedCount++;
        }

        if (nextDownNode.hasDownNode()) {
            nextDownNode = table.getCellByCoords(nextDownNode.downNode.x, nextDownNode.downNode.y);
        } else {
            nextDownNode = null;
        }

    }


    while (nextleftNode !== null && nextleftNode.canBeHitted) {
        if (!nextleftNode.isHitted) {
            nextleftNode.isHitted = true;
            hittedCount++;
        }

        if (nextleftNode.hasLeftNode()) {
            nextleftNode = table.getCellByCoords(nextleftNode.leftNode.x, nextleftNode.leftNode.y);
        } else {
            nextleftNode = null;
        }

    }

    while (nextRightNode !== null && nextRightNode.canBeHitted) {
        if (!nextRightNode.isHitted) {
            nextRightNode.isHitted = true;
            hittedCount++;
        }

        if (nextRightNode.hasRightNode()) {
            nextRightNode = table.getCellByCoords(nextRightNode.rightNode.x, nextRightNode.rightNode.y);
        } else {
            nextRightNode = null;
        }

    }

    return hittedCount;
}

function moveBFigure(currFigure, table){
    let hittedCount = 0;

    let nextUpRightNode = currFigure.hasUpRightNode() ? table.getCellByCoords(currFigure.upRightNode.x, currFigure.upRightNode.y) : null;
    let nextDownRightNode = currFigure.hasDownRightNode() ? table.getCellByCoords(currFigure.downRightNode.x, currFigure.downRightNode.y) : null;
    let nextDownLeftNode = currFigure.hasDownLeftNode() ? table.getCellByCoords(currFigure.downLeftNode.x, currFigure.downLeftNode.y) : null;
    let nextUpLeftNode = currFigure.hasUpLeftNode() ? table.getCellByCoords(currFigure.upLeftNode.x, currFigure.upLeftNode.y) : null;

    while (nextUpLeftNode !== null && nextUpLeftNode.canBeHitted) {
        if (!nextUpLeftNode.isHitted) {
            nextUpLeftNode.isHitted = true;
            hittedCount++;
        }

        if (nextUpLeftNode.hasUpLeftNode()) {
            nextUpLeftNode = table.getCellByCoords(nextUpLeftNode.upLeftNode.x, nextUpLeftNode.upLeftNode.y);
        } else {
            nextUpLeftNode = null;
        }
    }

    while (nextDownLeftNode !== null && nextDownLeftNode.canBeHitted) {
        if (!nextDownLeftNode.isHitted) {
            nextDownLeftNode.isHitted = true;
            hittedCount++;
        }

        if (nextDownLeftNode.hasDownLeftNode()) {
            nextDownLeftNode = table.getCellByCoords(nextDownLeftNode.downLeftNode.x, nextDownLeftNode.downLeftNode.y);
        } else {
            nextDownLeftNode = null;
        }
    }

    while (nextDownRightNode !== null && nextDownRightNode.canBeHitted) {
        if (!nextDownRightNode.isHitted) {
            nextDownRightNode.isHitted = true;
            hittedCount++;
        }

        if (nextDownRightNode.hasDownRightNode()) {
            nextDownRightNode = table.getCellByCoords(nextDownRightNode.downRightNode.x, nextDownRightNode.downRightNode.y);
        } else {
            nextDownRightNode = null;
        }
    }

    while (nextUpRightNode !== null && nextUpRightNode.canBeHitted) {
        if (!nextUpRightNode.isHitted) {
            nextUpRightNode.isHitted = true;
            hittedCount++;
        }

        if (nextUpRightNode.hasUpRightNode()) {
            nextUpRightNode = table.getCellByCoords(nextUpRightNode.upRightNode.x, nextUpRightNode.upRightNode.y);
        } else {
            nextUpRightNode = null;
        }
    }

    return hittedCount;
}


function solveTestCase(lines) {
    const {table, figuresCoordsArr} = makeTable(lines);
    const initialCellsCount = 64;
    let hittedCount = 0;
    const figuresCount = figuresCoordsArr.length;

    figuresCoordsArr.forEach((figure) => {
        const currFigure = table.getCellByCoords(figure.x, figure.y);

        if (currFigure.figureType === 'R') {
            hittedCount = hittedCount + moveRFigure(currFigure, table);
        }

        if (currFigure.figureType === 'B') {
            hittedCount = hittedCount + moveBFigure(currFigure, table);
        }
    })

    // КОД

    console.log(64 - hittedCount - figuresCount);
}

const lines = [];
createInterface({
    input: process.stdin,
    output: process.stdout,
}).on("line", (line) => {
    lines.push(line.toString().trim().split(''));
}).on("close", () => {
    solveTestCase(lines);
});
