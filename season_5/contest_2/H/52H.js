// https://contest.yandex.ru/contest/59540/problems/H/

const { createInterface } = require("readline");




//let test = [
//'6 4',
//'1 6 4 9',
//'3 2 7 5',
//'3 7 5 2',
//'8 5 1 9',
//'7 5 3 1',
//'4 3 7 6',
//   ];



function findMaxExceptColumn(row, j){
    let max = null;

    for (let k = 0; k < row.length; k++){
        if (k !== j) {
            if (max === null || row[k] > max ){
                max = row[k];
            }
        }
    }
    return max;
};

function excludeRowAndFindOptimalColumn(matrix, maxElement, m){
    //исключаем эту строку
    const maxElementIndex = maxElement.i;

    let maxes = [];

    for (let j = 0; j < m; j++){
        let bestMax = null;
        let bestJ = null;

        matrix.forEach((row, i) => {
            if (i !== maxElementIndex) {
                let currMax = findMaxExceptColumn(row, j);

                if (bestMax === null || currMax > bestMax) {
                    bestMax = currMax;
                    bestJ = j;
                }
            }
        })

        maxes.push({bestMax, bestJ});
    }

    let best = maxes.sort((a,b) => a.bestMax - b.bestMax)[0];

    return {bestMax: best.bestMax, bestJ: best.bestJ, bestI: maxElementIndex};

};

function excludeColumnAndFindOptimalRow(matrix, maxElement, n){
    //исключаем этот столбец
    const maxElementJ = maxElement.j;

    let maxes = [];

    for (let k = 0; k < n; k++){
        let bestMax = null;
        let bestI = null;

        matrix.forEach((row, i) => {
            if (k !== i) {
                let currMax = findMaxExceptColumn(row, maxElementJ);

                if (bestMax === null || currMax > bestMax) {
                    bestMax = currMax;
                    bestI = k;
                }
            }
        })

        maxes.push({bestMax, bestI});
    }

    let best = maxes.sort((a,b) => a.bestMax - b.bestMax)[0];

    return {bestMax: best.bestMax, bestJ: maxElementJ, bestI: best.bestI};

};

function solveTestCase(test){
    debugger;
    const [n, m] = test.shift().split(' ').map(Number);
    let matrix = [];
    let maxElements = [];
    let maxElement = null;

    // создаём матрицу
    for (let i = 0; i < n; i++){
        let row = test[i].split(' ').map(Number);
        matrix[i] = row;
    }

    // ищем максимумы
    for (let i = 0; i < n; i++){
        for (let j = 0; j < m; j++){


            let curr = matrix[i][j];

            if (maxElement === null) {
                maxElement = curr;
                maxElements.push({value: curr, i, j});
            } else if (curr > maxElement) {
                maxElements = [];
                maxElement = curr;
                maxElements.push({value: curr, i, j});
            } else if (curr === maxElement) {
                maxElements.push({value: curr, i, j});
                maxElement = curr;
            }


        }

    }

    let optimal = null;

    let max = maxElements.pop();
    let optimalResult = excludeRowAndFindOptimalColumn(matrix, max, m);
    let optimalResult2 = excludeColumnAndFindOptimalRow(matrix, max, n)

    let bestFromOptimals = optimalResult.bestMax < optimalResult2.bestMax ? optimalResult : optimalResult2;

    if (optimal === null || bestFromOptimals.bestMax < optimal.bestMax) {
        optimal = bestFromOptimals;
    }



    console.log(optimal.bestI + 1, optimal.bestJ + 1);

};

//solveTestCase(test);

const lines = [];
createInterface({
    input: process.stdin,
    output: process.stdout,
}).on("line", (line) => {
    lines.push(line.toString().trim());
}).on("close", () => {
    solveTestCase(lines);
});
