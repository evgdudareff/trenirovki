// https://contest.yandex.ru/contest/26133/run-report/140085055/

/*
-- ПРИНЦИП РАБОТЫ --
Я реализовал проверку, можно ли собрать исходный текст из приведенного множества слов.
Для хранения слов я использовал структуру данных "бор" (trie). Она позволяет эффективно хранить слова и достаточно быстро
их добавлять и искать. Конец слова помечается специальным терминальным узлом, использую TERMINAL_NODE_KEY символ.
Сам алгоритм рекурсивно строит префикс, стартуя с какой-то позиции и пытается по префиксу достать слово
из бора. Если это получается, то пытаемся проделать то же самое для оставшейся части текста.

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
Исходя из принципа работы, если рекурсивно получается продвинуть индекс до конца строки, то разбить строку на слова можно.
Для оптимизации, ограничиваем текущий индекс как индекс + самое длинное слово в боре, чтобы не перебирать лишние символы.
Также для ускорения работы запоминаем те индесы текста, в которых уже побывали.


-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Построение бора занимает O(L), где L - суммарная длина слов множеств.
Поиск в боре занимает O(K), где K - длина префикса.
Сам же "рекурсивный" обход (через очередь) в худшем случае потребует проверки всех позиций в тексте, значит O(T),
где T - длина текста. И для каждой позиции в тексте будем проверять до максимального по длине слова в боре, значит O(T * M),
где M - самое длинное слово в боре.
Итого: O(L) + O(T * M).

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Хранение слов в боре занимает O(L), где L - суммарная длина слов множеств.
Посещенные вершины (индексы) в худшем случае займут O(T), где T - длина текста. Столько же в худшем случае займёт
очередь.
Итого: O(L) + 2 *  O(T) = O(L) + O(T)

*/

const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);

const TERMINAL_NODE_KEY = Symbol('TERMINAL_NODE_KEY');
class Trie {

    _root = new Map();

    addWord(word) {
        let currNode = this._root;

        for (let i = 0; i < word.length; i++) {
            let char = word[i];
            let charNode = currNode.get(char);

            if (!charNode) {
                let newNode = new Map();
                currNode.set(char, newNode);
                currNode = newNode;
            } else {
                currNode = charNode;
            }
        }

        currNode.set(TERMINAL_NODE_KEY, true);
    }

    getWord(word) {
        let currNode = this._root;

        for (let i = 0; i < word.length; i++) {
            let char = word[i];
            let charNode = currNode.get(char);

            if (!charNode) {
                return null;
            }

            currNode = charNode;
        }

        return currNode;
    }
}

let text;
let n;
let lineNumber = 0;
let alreadyVisitedIdx;
const trie = new Trie();
let maxWordLength = 0;

function onLineListener(line) {
    if (lineNumber === 0) {
        text = line;
        alreadyVisitedIdx = new Array(text.length).fill(false);
        lineNumber++;
    } else if (lineNumber === 1) {
        n = Number(line);
        lineNumber++;
    } else {
        trie.addWord(line);
        maxWordLength = Math.max(maxWordLength, line.length);
    }
}

function checkString(str, fromIdx) {
    const queue = [fromIdx];

    while (queue.length) {
        let fromIdx = queue.shift();
        if (fromIdx === str.length) {
            return true;
        }

        if (alreadyVisitedIdx[fromIdx]){
            continue;
        }
        alreadyVisitedIdx[fromIdx] = true;

        let prefix = '';
        for (let pos = fromIdx; pos < Math.min(str.length, fromIdx + maxWordLength); pos++) {
            prefix = prefix + str[pos];
            let wordNode = trie.getWord(prefix);
            if (wordNode !== null && wordNode.get(TERMINAL_NODE_KEY)) {
                queue.push(pos + 1);
            }
        }

    }
    return false;
}

function solve() {
    const res = checkString(text, 0);
    process.stdout.write(res === true ? 'YES' : 'NO');
}


