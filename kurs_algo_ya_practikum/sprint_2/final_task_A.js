// https://contest.yandex.ru/contest/22781/run-report/135453617/

/*
-- ПРИНЦИП РАБОТЫ --
Я реализовал двунаправленную очередь (дек) на кольцевом буфере.
Кольцевой буфер реализован на массиве фиксированной длины, которую мы передаём конструктору дека при создании.
При попытке добавить или вынуть элемент из пустой очереди - возвращается строка 'error'

Описание интерфейса дека:
- pushFront - добавить элемент в начало очереди
- pushBack - добавить элемент в конец очереди
- popFront - удалить элемент из начала очереди
- popBack - удалить элемент из конца очереди

В каждый момент времени работы дека мы вручную следим за указателями на начало/голову (head) и конец/хвост (tail) очереди,
размером очереди и элементами в очереди.

При добавлении в начало очереди - элемент будет первым кандидатом на удаление из начала очереди.
И наоборот, при добавлении в конец очереди - элемент будет первым кандидатом на удаление из конца очереди.

При каждом добавлении в начало очереди - мы движемся по кольцу вправо.
При каждом добавлении в конец очереди - мы движемся по кольцу влево.

При пустой очереди указатели на начало и конец очереди всегда указывают на 0-ый индекс кольцевого буффера. Это
состояние также поддерживается после вынимания единственного элемента из очереди.

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
Из описания алгоритма следует, что стартовой позицией начала и конца очереди при ее пустоте является 0-ый индекс буфера.
Принимая во внимание принцип работы выше, можно сформулировать следующие утверждения:
- При последовательном добавлении в начало - буфер будет заполняться слева -> направо, пока очередь не заполнена.
- При последовательном добавлении в конец - буфер будет заполняться справа -> налево, пока очередь не заполнена.
- При хаотичном добавление в начало и конец - буфер будет как бы "сходиться" с двух сторон, пока очередь не заполнена.
- При вынимании элемента из начала очереди - буфер будет высвобождать элемент на позиции текущего начала очереди и
сдвигать голову очереди влево. Таким образом буфер будет высвобождаться справа -> налево, пока очередь не будет пуста.
- При вынимании элемента из конца очереди - буфер будет высвобождать элемент на позиции текущего конца очереди и
сдвигать хвост очереди вправо. Таким образом буфер будет высвобождаться слева -> направо, пока очередь не будет пуста.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Добавление в очередь с любой стороны - O(1), потому что вычисление новой позиции начала/конца и вставка в массив по индекску - O(1).
Извлечение из очереди с любой стороны - O(1), потому что вычисление новой позиции начала/конца и вставка пустого элемента
null в массив по индекску - O(1).
Размер очереди фиксирован, не нужно производить n операций для увелечения размера буффера.

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Очередь содержит n элементов, ее размер фиксирован. То есть O(n) памяти.
*/

const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);

class Deque {
    constructor(maxSize) {
        this.maxSize = maxSize;
        this.buffer = new Array(maxSize).fill(null);
        this.head = 0;
        this.tail = 0;
        this.size = 0;
    }

    isFull() {
        return this.size === this.maxSize;
    }

    isEmpty() {
        return this.size === 0;
    }

    resetHeadAndTail() {
        this.tail = 0;
        this.head = 0;
    }

    getNextPointerIndex(pointerName) {
        return (this[pointerName] + 1) % this.maxSize;
    }

    getPrevPointerIndex(pointerName) {
        const pointerIndex = (this[pointerName] - 1) % this.maxSize;
        return pointerIndex < 0 ? this.maxSize + pointerIndex : pointerIndex;
    }

    pushFront(value) {
        if (this.isFull()) {
            return 'error';
        }

        if (!this.isEmpty()) {
            this.head = this.getNextPointerIndex('head');
        }

        this.buffer[this.head] = value;
        this.size++;
    }

    pushBack(value) {
        if (this.isFull()) {
            return 'error';
        }

        if (!this.isEmpty()) {
            this.tail = this.getPrevPointerIndex('tail');
        }

        this.buffer[this.tail] = value;
        this.size++;
    }

    popFront() {
        if (this.isEmpty()) {
            return 'error';
        }

        const headValue = this.buffer[this.head];
        this.buffer[this.head] = null;
        this.size--;

        if (!this.isEmpty()) {
            this.head = this.getPrevPointerIndex('head');
        } else {
            this.resetHeadAndTail();
        }

        return headValue;
    }

    popBack() {
        if (this.isEmpty()) {
            return 'error';
        }

        const tailValue = this.buffer[this.tail];
        this.buffer[this.tail] = null;
        this.size--;

        if (!this.isEmpty()) {
            this.tail = this.getNextPointerIndex('tail');
        } else {
            this.resetHeadAndTail();
        }

        return tailValue;
    }

}

const commandFuncs = {
    'push_front': (deq, value) => deq.pushFront(Number(value)),
    'push_back': (deq, value) => deq.pushBack(Number(value)),
    'pop_front': (deq, _) => String(deq.popFront()),
    'pop_back': (deq, _) => String(deq.popBack()),
}
const output = [];
let lineNumber = 0;
let deq;

function onLineListener(line) {
    if (lineNumber === 1) {
        deq = new Deque(Number(line))
    } else if (lineNumber > 1) {
        const [command, value] = line.split(' ');
        const commandResult = commandFuncs[command](deq, value);
        if (typeof commandResult === 'string') {
            output.push(commandResult);
        }
    }
    lineNumber++;
}

function solve() {
    process.stdout.write(output.join('\n'));
}
