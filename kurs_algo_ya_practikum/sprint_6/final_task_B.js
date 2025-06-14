
// https://admin.contest.yandex.ru/submissions/138879892
// https://new.contest.yandex.ru/contests/25070/problem?id=6659412%2F2024_09_21%2FSLiQg1OUUE&tab=submissions&submissionId=10000068-3854-f1e5-81ca-80b27ee6a92f
/*
-- ПРИНЦИП РАБОТЫ --
Я реализовал поиск компонентов связности (сколько их и какой максимальный) в невзвешенном неориентированном графе, который
представлен в виде матрицы n x m. В формулировке задаче "острова" (обозначаются при вводе как #) - это вершины графа,
причем связь между вершинами есть в том случае, если они расположены как соседние ячейки матрицы по горизонтали и вертикали.
По диагонали считается, что вершины не связаны.

Поиск компонент связности происходит при помощи модифицированного поиска в глубину DFS. Вершины красятся в то количество цветов,
сколько присутсвует компонент-связности в графе. Эта информация содержится в componentCountMap. Причем "окрашивание" вершин
для экономии памяти происходит прямо в матрице, в которое хранится карта "островов". При "окрашивании" также вычисляется
текущий максимальный компонент-связности.

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
"Алгоритм поиска компонент связности действует так же, как DFS, только красит вершину не в чёрный цвет, а в тот же, что и
смежную вершину. Если смежные вершины ещё не покрашены, нужно выбрать новый цвет". Конец цитаты.

Начиная с первой ячейки идём по карте. Если текущая ячейка - остров (т.е. не вода и не "окрашен"), то запускаем из нее DFS.
По мере прохода DFS будем "окрашивать" вершины, попутно обновляя данные по компонентам-связности.


-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Нужно просмотреть все клетки, причем каждая будет посещена только 1 раз - это занимает O(n x m), где n,m - размеры матрицы.
Вычисление максимума и количества компонент-связности происходит за O(1).
Итого: O(n x m).

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Хранение матрицы - O(n x m).
В худшем случае, если вся матрица будет одним сплошным островом, то в реализации DFS стек для обхода займёт еще O(n x m).
Хранение мапы с уникальными компонентами связности займёт какое-то число k, которое меньше чем n x m.
Итого: O(n x m).
*/

const readline = require('readline');
const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);


let n, m;
let lineNumber = 0;
let field = [];
let componentCount = 0;
let maxComponentCount = 0;
const componentCountMap = new Map();
const movements = [[0, 1], [0, -1], [1, 0], [-1, 0]];
const earth = '#';

function onLineListener(line) {
    if (lineNumber === 0) {
        [n, m] = line.split(' ').map(Number);
        lineNumber++;
    } else  {
        field.push(line.split(''));
    }
}

// Обновляет данные по тому, сколько элементов включает в себя определённый компонент связности
// и считает текущий максимальный компонент связности
function updateComponentCountMap(componentCount) {
    const newComponentCountValue = (componentCountMap.get(componentCount) || 0) + 1;
    componentCountMap.set(componentCount, newComponentCountValue);
    maxComponentCount = Math.max(newComponentCountValue, maxComponentCount);
}

function canMoveToCell(cell) {
    const [x,y] = cell;
    return x >= 0 && y >= 0 && x < n && y < m && field[x][y] === earth;
}

function addCells(cell1, cell2) {
    return [cell1[0] + cell2[0], cell1[1] + cell2[1]];
}

function dfs(cell) {
    let stack = [];
    stack.push(cell);

    while (stack.length > 0) {
        let currCell = stack.pop();
        let [x, y] = currCell;

        if (field[x][y] === earth) {
            let neighborWithSomeComponentCount = null;

            for (let move of movements) {
                let neighborCell = addCells(currCell, move);

                if (canMoveToCell(neighborCell)) {
                    let [neighborCellX, neighborCellY] = neighborCell;
                    let neighborCellValue = field[neighborCellX][neighborCellY];

                    if (neighborCellValue === earth) {
                        stack.push(neighborCell)
                    } else {
                        neighborWithSomeComponentCount = neighborCellValue;
                    }
                }
            }

            if (neighborWithSomeComponentCount) {
                field[x][y] = neighborWithSomeComponentCount;
                updateComponentCountMap(neighborWithSomeComponentCount);
            } else {
                field[x][y] = componentCount;
                updateComponentCountMap(componentCount);
            }
        }
    }
}

function solve() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (field[i][j] === earth) {
                componentCount++;
                dfs([i, j]);
            }
        }

    }

    process.stdout.write(`${componentCount} ${maxComponentCount}`);
}