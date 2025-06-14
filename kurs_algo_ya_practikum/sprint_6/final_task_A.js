
// https://admin.contest.yandex.ru/submissions/138856744
// https://new.contest.yandex.ru/contests/25070/problem?id=51450%2F2020_08_27%2FM6r8NNr0fY&tab=submissions&submissionId=10000068-370d-e9ab-8035-ca69a1538c7e

/*
-- ПРИНЦИП РАБОТЫ --
Я реализовал алгоритм Прима для поиска максимального остовного дерева с использованием бинарной невозрастающей кучи для хранения ребёр-кандидатов.
Нужно вывести вес максимального остовного дерева. Причем, если в данных будет более одного компонента-связности, то нужно вывести Oops! I did it again.
Для работы нам нужно хранить вершины, входящие в остов (addedSpanningVertices) и вершины, которые еще нужно посетить (notAddedVertices).
Рёбра-кандидаты будем хранить в куче edgesCandidatesHeap (maxHeap). Связи между вершина графа храним в vertices.

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
Работу алгоритм начинает с вершины с номером 1 (можно взять любую).
Рассматриваем все рёбра, исходящие из текущей вершины. Все рёбра мы добавляем в кучу, которая организует очередь с приоритетом
и позволяет быстро получать максимальное ребро и ребалансироваться при вставке/удалении за O(log N). При рассмотрении очередной
вершины добавляем в кучу те рёбра, вершины которых не входят в остов. При рассмотрении вершины берём ребро с максимальным весом
и добавляем в остов вершину, в которую оно входило. При этом максимальное ребро удаляется из кучи при вынимании его оттуда.
Повторяем так до тех пор, пока в куче есть рёбра и есть непосещённые вершины. Если ребёр больше нет, а непосещенные вершины есть, то
у нас более 1 компонента-связности.


-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Каждое ребро обрабыватеся максимум 2 раза (добавляется/извлекается) - это занимает O(log K), где K - размер кучи.
Всего для вставки ребёр может потребоваться O(E) операций, где E - число ребёр.
В куче хранятся только рёбра, выходящие из текущего остова - их не больше, чем вершин V. Операции с кучей размера O(V) занимают O(log V).

Итого:  O(E⋅log V), где E — количество рёбер в графе, а V — количество вершин

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
В куче для неплотного графа храним O(V) ребёр, где V - число вершин. В случае плотного - O(E), где E - число ребёр.
Число посещенных вершин и вершин в остове - суммарно не более O(V), где V - число вершин.
Связь вершин между собой в худшем  будет O(2*E) -> O(E). (граф неориентированный, нужно хранить каждое ребро дважды).

Итого: O(V + E).
*/

const readline = require('readline');
const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);


// класс MaxHeap из прошлой финальной задачи 5-го спринта
class MaxHeap {
    constructor(isFirstItemBeforeComparator) {
        this._isFirstItemBefore = isFirstItemBeforeComparator;
        this._heapElements = [null];
    }

    _siftUp(idx) {
        if (idx === 1) {
            return;
        }

        const parentIdx = Math.floor(idx / 2);
        const currItem = this._heapElements[idx];
        const parentItem = this._heapElements[parentIdx];

        if (this._isFirstItemBefore(parentItem, currItem)) {
            return;
        }

        const temp = parentItem;
        this._heapElements[parentIdx] = currItem;
        this._heapElements[idx] = temp;

        return this._siftUp(parentIdx);
    }

    _siftDown(idx) {
        let leftIdx =  idx * 2;
        let rightIdx =  idx * 2 + 1;
        const heapSize = this.getSize();

        if (leftIdx >= heapSize) {
            return;
        }

        const currItem = this._heapElements[idx];
        const leftChildItem = this._heapElements[leftIdx];

        let largestIdx;
        if (rightIdx < heapSize) {
            const rightChildItem = this._heapElements[rightIdx];
            if (this._isFirstItemBefore(currItem, rightChildItem) && this._isFirstItemBefore(currItem, leftChildItem)) {
                return;
            }
            largestIdx = this._isFirstItemBefore(rightChildItem, leftChildItem) ? rightIdx : leftIdx;
        } else {
            if (this._isFirstItemBefore(currItem, leftChildItem)) {
                return;
            }
            largestIdx = leftIdx;
        }

        const temp = this._heapElements[largestIdx];
        this._heapElements[largestIdx] = currItem;
        this._heapElements[idx] = temp;

        return this._siftDown(largestIdx);
    }

    _getNextIdx() {
        return this._heapElements.length;
    }

    getSize() {
        const size = this._heapElements.length;
        return size === 1 ? 0 : size;
    }

    isEmpty() {
        return this.getSize() === 0;
    }

    add(item) {
        let nextIdx = this._getNextIdx();
        this._heapElements[nextIdx] = item;
        this._siftUp(nextIdx);
    }

    pop() {
        if (this.isEmpty()) {
            return;
        }

        const lastItem = this._heapElements.pop();
        if (this.isEmpty()) {
            return lastItem;
        }

        const topItem = this._heapElements[1];
        this._heapElements[1] = lastItem;
        this._siftDown(1);

        return topItem;
    }

}

let n, notAddedVertices;
let lineNumber = 0;
const vertices = new Map(); // {u -> Array<Array<v, w>>}
const addedSpanningVertices = new Set();
const edgesCandidatesHeap = new MaxHeap((edgeA, edgeB) => {
    const [_edgeAu, _edgeAv, edgeAw] = edgeA;
    const [_edgeBu, _edgeBv, edgeBw] = edgeB;
    return edgeAw > edgeBw;
});


function updateVertices(from, to, weight) {
    if (vertices.has(from)) {
        let edges = vertices.get(from);
        edges.push([to, weight]);
        vertices.set(from, edges);
    } else {
        vertices.set(from, [[to, weight]]);
    }
}

function onLineListener(line) {
    if (lineNumber === 0) {
        [n, m] = line.split(' ').map(Number);
        lineNumber++;
    } else  {
        let [u, v, w] = line.split(' ').map(Number);
        updateVertices(u, v, w);
        updateVertices(v, u, w);
    }
}


function getMaxWeightEdge() {
    return edgesCandidatesHeap.pop();
}

function addVertexToSpanningTree(u) {
    addedSpanningVertices.add(u);
    notAddedVertices.delete(u);

    const currVertexEdges = vertices.get(u);
    if (Array.isArray(currVertexEdges)) {
        for (let vertexEdge of currVertexEdges) {
            let [v, w] = vertexEdge;
            if (!addedSpanningVertices.has(v)) {
                edgesCandidatesHeap.add([u, v, w]);
            }
        }
    }

}

function solve() {
    notAddedVertices = new Set(Array.from({ length: n }, (_, i) => i + 1));
    let maxSpanningTreeWeight = 0;
    let startVertex = 1;

    addVertexToSpanningTree(startVertex);

    while (notAddedVertices.size > 0 && !edgesCandidatesHeap.isEmpty()) {
        let [_maxEdgeU, maxEdgeV, maxEdgeW] = getMaxWeightEdge();
        if (!addedSpanningVertices.has(maxEdgeV)) {
            maxSpanningTreeWeight += maxEdgeW;
            addVertexToSpanningTree(maxEdgeV);
        }
    }

    if (notAddedVertices.size !== 0) {
        process.stdout.write('Oops! I did it again');
    } else {
        process.stdout.write(`${maxSpanningTreeWeight}`);
    }
}