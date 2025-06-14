// https://contest.yandex.ru/contest/24414/run-report/137728704/

/*
-- ПРИНЦИП РАБОТЫ --
Я реализовал упрощенную хеш-таблицу, которая не поддерживает рехеширование, масштабирование и имеет ограниченное кол-во
элементов по условию задачи (не превышает 10^5). Разрешение коллизии происходит при помощи метода открытой адресации и
линейного пробирования. Ключи таблицы - целые числа (в том числе и отрицательные).

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
Известно, что оптимальный коэффициент заполнения хеш-таблицы равен 0.75. Но это для встроенных и оптимизированных
хеш-таблиц, а тут учебный вариант. Поэтому берём 0.5. Отсюда максимальное кол-во корзин равняется:
M = N / 0,5 ->  99 999 / 0.5 -> 199 998 -> 200 003 (ближайшее простое число, чтобы снизить число коллизий).

Поскольку ключи целые числа и число корзин не будет меняться, то будем сразу получать номер корзины, не используя
хэш функцию, которая бы вычислял хэш ключа и по которой бы уже дальше получали номер корзины. Номер корзины для простоты
получаем вычислением остатка деления ключа на максимальное число корзин (_getBucketIndex). Дополнительно, чтобы не выйти
за границы массива корзин используем метод _getNextIndex.

Для упрощения кода доверимся, что элементов реально не больше 10^5, поэтому, чтобы не усложнять код при поиске нужного ключа
зацикливаем местами while(true) и не проверяем, что могли пройти полный круг по всем корзинам. Типа это технически возможно,
но по бизнес-требованию не произойдёт.

Метод put принимает ключ и значение. Если по полученному индексу корзины нужный нам ключ - то просто обновим значение.
Иначе будем двигаться до тех пор, пока не найдена пустая (undefined) или удалённая (deleted) корзина - в них можно сразу
положить новый ключ-значение.

Метод get принмиает ключ. Если по полученному индексу корзины нужный нам ключ - то просто возвращаем значение.
Иначе будем двигаться до тех пор, пока не найдена пустая (undefined) - в наших ограничениях это означает, то такого ключа
нет (хотя по идее надо было проверять, прошли ли полный круг по всем корзинам). Если ключа нет - возвращаем None.

Метод delete принмиает ключ и ищем его по тому же алгоритму, что и get. Если по полученному индексу корзины нужный нам
ключ - то просто возвращаем значение и помечаем удалённую корзину как deleted. Если ключа нет - возвращаем None.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Если распределение ключей происходит идеально, то каждый ключ один в одной корзине. В этом случае методы отработают за O(1).
В худшем случае нужный ключ будет в самом конце массива корзин. Тогда методам понадобится O(n).
В среднем случае будет по формуле O(1/(1-alfa)), где alfa - коэфф. заполнения.

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Нам всегда нужно хранить n корзин. Поэтому O(n).

*/
const readline = require('readline');

class HashMap {
    constructor(maxSize) {
        this.maxSize = maxSize;
        // [key, value]
        this.buckets = new Array(maxSize).fill([undefined,undefined]);
    }

    put(key, value) {
        let bucketIndex = this._getBucketIndex(key);

        while (true) {
            let [currBucketKey, _] = this.buckets[bucketIndex];
            if (currBucketKey === key) {
                this.buckets[bucketIndex] = [key, value];
                return;
            }

            if (currBucketKey === undefined || currBucketKey === 'deleted') {
                this.buckets[bucketIndex] = [key, value];
                return;
            }

            bucketIndex = this._getNextIndex(bucketIndex);
        }

    }

    get(key) {
        let [bucketValue, _] = this._get(key);
        return bucketValue;
    }

    delete(key) {
        let [bucketValue, bucketIndex] = this._get(key);
        if (bucketValue === 'None') {
            return bucketValue;
        }

        let removedValue = this.buckets[bucketIndex][1];
        this.buckets[bucketIndex] = ['deleted', 'deleted'];
        return removedValue;
    }

    _get(key) {
        let bucketIndex = this._getBucketIndex(key);

        while (true) {
            let [currBucketKey, currBucketValue] = this.buckets[bucketIndex];
            if (currBucketKey === key) {
                return [currBucketValue, bucketIndex];
            }

            if (currBucketKey === undefined) {
                return ['None', 'None'];
            }

            bucketIndex = this._getNextIndex(bucketIndex);
        }


    }

    _getBucketIndex(id) {
        const rawHash = id % this.maxSize;
        return rawHash >= 0 ? rawHash : this.maxSize + rawHash;
    }

    _getNextIndex(index) {
        return ((index + 1) % this.maxSize + this.maxSize) % this.maxSize;
    }
}


const m = 200003;
let n;
let hashMap = new HashMap(m);
let lineNumber = 0;
let answer = [];

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);

const commandMapper = {
    ['put']: (hashMap, key, value) => hashMap.put(key, value),
    ['get']: (hashMap, key) => hashMap.get(key),
    ['delete']: (hashMap, key) => hashMap.delete(key),
}

function onLineListener(line) {
    if (lineNumber === 0) {
        n = Number(line);
        lineNumber++;
    } else {
        let [command, key, value] = line.split(' ');
        let res = commandMapper[command](hashMap, key, value);
        if (res !== undefined ) {
            answer.push(`${res}`);
        }
    }

}

function solve() {
    for (let i = 0; i < answer.length; i++) {
        process.stdout.write(`${answer[i]}\n`)
    }
}