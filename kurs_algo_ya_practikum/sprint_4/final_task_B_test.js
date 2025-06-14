// https://contest.yandex.ru/contest/

/*
-- ПРИНЦИП РАБОТЫ --

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --

*/
class HashMap {
    constructor(maxSize) {
        this.maxSize = maxSize;
        this.buckets = new Array(maxSize).fill([undefined,undefined]);
    }

    put(key, value) {
        let bucketIndex = getBucketIndex(key, this.maxSize);
        let [currBucketKey, _] = this.buckets[bucketIndex];
        if (currBucketKey === key) {
            this.buckets[bucketIndex] = [key, value];
            return;
        }
        try {
            while (this.buckets[bucketIndex][0] !== undefined && this.buckets[bucketIndex][0] !== 'deleted') {
                bucketIndex = getNextIndex(bucketIndex, this.maxSize);
            }
        } catch (e) {
            console.log('here')
        }

        this.buckets[bucketIndex] = [key, value];
    }

    _get(key) {
        let bucketIndex = getBucketIndex(key, this.maxSize);
        let [currBucketKey, currBucketValue] = this.buckets[bucketIndex];
        if (currBucketKey === key) {
            return [currBucketValue, bucketIndex];
        }

        if (currBucketKey === undefined) {
            return ['None', 'None'];
        }

        while (currBucketKey !== key) {
            bucketIndex = getNextIndex(bucketIndex, this.maxSize);
            try {
                [currBucketKey, currBucketValue] = this.buckets[bucketIndex];
            } catch (e) {
                console.log('here');
            }

            if (currBucketKey === undefined) {
                return ['None', 'None'];
            }
            if (currBucketKey === key) {
                return [currBucketValue, bucketIndex];
            }

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
}


const readline = require('readline');
const fs = require('fs');
const path = require('path');
let n;
const m = 200009;
let hashMap = new HashMap(m);
let lineNumber = 0;
let answer = [];
const commandMapper = {
    ['put']: (hashMap, key, value) => hashMap.put(key, value),
    ['get']: (hashMap, key) => hashMap.get(key),
    ['delete']: (hashMap, key) => hashMap.delete(key),
}

function getNextIndex(index, maxSize) {
    return ((index + 1) % maxSize + maxSize) % maxSize;
}
// Чтение файла построчно
const filePath = path.join(__dirname, 'inputB.txt');
const fileContent = fs.readFileSync(filePath, 'utf-8');
const lines = fileContent.split('\n').filter(line => line.trim() !== '');

// Обработка каждой строки
lines.forEach(line => {
    onLineListener(line);
});
solve(); // Вызываем обработку после чтения файла



const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);

// M = N / 0,5 -> до ближайшего целого (99 999 / 0.5 -> 199 998 -> 200 003



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

function getBucketIndex(id, hashMapSize) {
    const rawHash = id % hashMapSize;
    return rawHash >= 0 ? rawHash : hashMapSize + rawHash;
}

function solve() {
    for (let i = 0; i < answer.length; i++) {
        process.stdout.write(`${answer[i]}\n`)
    }
}