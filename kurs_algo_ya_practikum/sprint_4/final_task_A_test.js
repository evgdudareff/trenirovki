// https://contest.yandex.ru/contest/

/*
-- ПРИНЦИП РАБОТЫ --

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --

*/

const fs = require('fs');
const path = require('path');
const stringToId = {};
const idToString = {};
let nextId = 1;

function encode(str) {
    if (!stringToId[str]) {
        stringToId[str] = nextId;
        idToString[nextId] = str;
        nextId++;
    }
    return stringToId[str];
}

function decode(id) {
    return idToString[id];
}

const readline = require('readline');
let n;
let m;
let words = new Map();
let docs = [];
let lineNumber = 0;
let answers = [];

// Чтение файла построчно
const filePath = path.join(__dirname, 'input.txt');
const fileContent = fs.readFileSync(filePath, 'utf-8');
const lines = fileContent.split('\n').filter(line => line.trim() !== '');

// Обработка каждой строки
lines.forEach(line => {
    onLineListener(line);
});
solve(); // Вызываем обработку после чтения файла
// https://contest.yandex.ru/contest/

/*
-- ПРИНЦИП РАБОТЫ --

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --

*/

// words -> (word : (docNumber: wordCount) )


function onLineListener(line) {
    if (lineNumber === 0) {
        n = Number(line);
    } else if (lineNumber <= n ){
        let docNumber = lineNumber;
        line.split(' ').forEach((word) => {
            if (words.has(word)) {
                let docs = words.get(word);
                if (docs.has(docNumber)) {
                    docs.set(docNumber, docs.get(docNumber) + 1);
                } else {
                    docs.set(docNumber, 1);
                }
            } else {
                let docs = new Map();
                docs.set(docNumber, 1)
                words.set(word, docs);
            }
        })
    } else if (lineNumber === n + 1) {
        m = Number(line);
    } else {
        const uniqueWords = Array.from(new Set(line.split(' ')));
        const relevantDocs= {}; // {docNumber: count}
        let memory = process.memoryUsage().heapUsed / (1024 * 1024);
        uniqueWords.forEach((searchWord) => {
            if (words.has(searchWord)) {
                words.get(searchWord).forEach((count, docNumber) => {
                    if (relevantDocs[docNumber] === undefined) {
                        relevantDocs[docNumber] = count;
                    } else {
                        relevantDocs[docNumber] += count;
                    }
                })

            }
        });
        const sortedRelevant = Object.entries(relevantDocs).sort(([docNumberA, countA], [docNumberB, countB]) => {
            if (countA === countB) {
                return Number(docNumberA) - Number(docNumberB);
            }
            return countB - countA;
        });
        answers.push(sortedRelevant.slice(0, 5).map((arr) => arr[1] > 0 ? arr[0] : null).filter((count) => count !== null).join(' '));

    }
    lineNumber++;
}

function solve() {
    answers.forEach((answer) => process.stdout.write(`${answer}\n`))
}