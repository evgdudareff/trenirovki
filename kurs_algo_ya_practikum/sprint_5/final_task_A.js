// Контест обновился и теперь нельзя вот так скопировать ссылку на посылку. Скопировал айди посылки и вставил в 2 разные ссылки:
// первая, как раньше урл выглядел. Вторая, как наставник рекомендовал. Первая ссылка всё равно открывает сразу две задачи. Вторая
// мне не доступна. 3-ссылка это скопировал урл из контеста (у меня ок открылось, но не выбирается JS по-умолчанию)

// https://contest.yandex.ru/contest/24810/run-report/138328934/
// https://admin.contest.yandex.ru/submissions/138328934/
// https://new.contest.yandex.ru/contests/24810/problem?id=51450%2F2021_02_04%2FLGaJZ4au9k&tab=submissions&submissionId=10000068-24d2-d35d-4a1a-69ffdc955ad1

/*
-- ПРИНЦИП РАБОТЫ --
Я реализовал пирамидальную сортировку на базе бинарной невозрастающей куче (max-heap).
Коротко: куча - это структура данных, в которой значение в родителе более приоритетно, чем значение в детях дерева. Данная
структура данных строится на динамическом массиве таким образом, что зная индекс элемента за O(1) определяем родителя и детей
по заранее определенным формулам.

Если дан неотсортированный массив, то, если добавлять элементы в кучу попутно поддерживая её свойства, то затем можно вынимать
элементы поочерёдно с вершины кучи и получать отсортированную последовательность.

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
При добавлении элемента в кучу мы добавляем элемент в первое свободное место. Чтобы поддержать свойство кучи, нужно
сравнить добавляемый элемент и его родителя. Если добавляемый элемент больше родителя (для max-heap) - то их меняют местами. Процесс повторяется
выше по дереву. За это отвечает метод sift_up (просеивание вверх). Таким образом вверху кучи будет максимальный элемент.

При вынимании элемента из кучи - достаём самый приоритетный элемент. На его место ставится самый последний элемент кучи. Это может
нарушить свойство кучи и будет необходимо это исправить. За это отвечает метод sift_down (просеивание вниз). Если значение
текущего узла меньше, чем значение его потомков, то нужно понять максимальный элемент из потомков и поменяться с ним местами.
Процесс повторяется далее по дереву, пока значение текущего узла не станет больше, чем значение его потомков, либо если у
текущего узла отсутствуют потомки.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Создание кучи О(1)
Добавление элемента в кучу не больше O(N * logN)
Удаление элемента из кучи тоже не больше O(N * logN)
Итого: О(1) + O(N * logN) + O(N * logN) = O(N * logN)

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
В моей реализации потребуется O(N) памяти для хранения самой кучи, где N - кол-во элементов исходного массива.
*/

const readline = require('readline');

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

// Participant = Array<uniqueLogin: str, P: number, F: number>
function isFirstParticipantBefore([aLogin, aP, aF], [bLogin, bP, bF]) {
    if (aP > bP) {
        return true;
    } else if (aP < bP) {
        return false;
    }

    if (aF < bF) {
        return true;
    } else if (aF > bF) {
        return false;
    }

    return aLogin < bLogin;
}

let n;
let lineNumber = 0;
const heap = new MaxHeap(isFirstParticipantBefore);

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);


function onLineListener(line) {
    if (lineNumber === 0) {
        n = Number(line);
        lineNumber++;
    } else {
        const participant = line.split(' ');
        heap.add([participant[0], Number(participant[1]), Number(participant[2])])
    }
}

function solve() {
    while (!heap.isEmpty()) {
        let participant = heap.pop();
        process.stdout.write(`${participant[0]}\n`);
    }
}