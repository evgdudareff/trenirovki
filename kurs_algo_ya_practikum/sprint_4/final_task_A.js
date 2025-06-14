// https://contest.yandex.ru/contest/24414/run-report/137725369/

/*
-- ПРИНЦИП РАБОТЫ --
Я реализовал упрощённый вариант поисковой системы, которая ищет 5 самых релевантных документов (строк) по поисковым
запросам. Для каждого уникального слова из запроса считается кол-во его вхождений в документ. Такая сумма считается по всем
словам из запроса. Чем больше сумма - тем выше релевантность. Ответ выводится по убыванию релевантности. Если же релевантность
совпадает, то по возрастанию номеров документов.

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
Сама поисковая система хранит словарь, в котором ключи - это слова (word). Значениями же аналогично выступает словарь, который
хранит номера документов (docNumber) и частоту упоминания слова (wordCount) в конкретном документе. Схематично можно представить это как:
words -> (word : (docNumber: wordCount) ). Эта структура строится налету, чтобы не хранить входные данные.

Поисковые запросы аналогично обрабатываются налету. Создаётся множество уникальных слов из запроса и затем для каждого слова
проверяется, сколько раз это слово встречается в ранее определенных документах. Считается общая сумма по документу (relevantDocs).
В итоге релевантные документы сортируются и сохраняются в ответ.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Для построения словаря использующихся слов в документах нужно обработать все слова во всех документах. Если документов n,
то временную сложность можно принять O(n). Считаем, что нас интересует временная сложность для 1 запроса, в каждом запросе не
более 100 символов, для каждого уникального слова в запросе нужно проверить все его ссылки на документы, если они есть. То есть можно
сказать, что у нас какое-то константное значение уникальных слов, для которых мы будем проверять документы. Если каждое слово упоминается в
каждом документе, то будет что-то типа O(c * n).
Обращения к используемым словарям (хэш-таблицы) считаем как O(1) в среднем случае, в худшем O(n). Найденные k релевантных документов
нужно отсортировать - примем сложность O(k*logk). Причем в худшем случае все документы могут быть релевантными.
Итого O(n) + O(c * n) + O(1) + O(k*logk), т.е O(k*logk) линейно-логарифмическая сложность.


-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Для построения словаря использующихся слов в документах нужно хранить все уникальные слова. Если слов n, то пространственная
сложность составит O(n). Считаем, что анализируем только 1 поисковой запрос, в котором m - уникальных слов. Но поскольку
длина запроса не более 100 символов, принимаем за константу c.
При работе программы нужно промежуточно харнить найденные k релевантных документов, пусть будет 0(k) для худшего случая.
Итого O(n) + c + O(k), т.е O(n) - линейная сложность.
*/

const readline = require('readline');

let n;
let m;
let lineNumber = 0;
let answers = [];
let words = new Map();

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);

function onLineListener(line) {
    if (lineNumber === 0) {
        n = Number(line);
    } else if (lineNumber <= n) {
        let docNumber = lineNumber;
        line.split(' ').forEach((word) => {
            if (words.has(word)) {
                let docs = words.get(word);
                docs.set(docNumber, (docs.get(docNumber) ?? 0) + 1);
            } else {
                let docs = new Map().set(docNumber, 1);
                words.set(word, docs);
            }
        })
    } else if (lineNumber === n + 1) {
        m = Number(line);
    } else {
        const searchUniqueWords = Array.from(new Set(line.split(' ')));
        const relevantDocs = new Map(); // {docNumber: count}

        searchUniqueWords.forEach((searchWord) => {
            if (words.has(searchWord)) {
                words.get(searchWord).forEach((count, docNumber) => {
                    relevantDocs.set(docNumber, (relevantDocs.get(docNumber) ?? 0) + count)
                })

            }
        });

        const sortedRelevantDocs = [...relevantDocs.entries()].sort(([docNumberA, countA], [docNumberB, countB]) => {
            if (countA === countB) {
                return Number(docNumberA) - Number(docNumberB);
            }
            return countB - countA;
        });

        answers.push(
            sortedRelevantDocs
                .slice(0, 5)
                .filter(([_, count]) => count > 0)
                .map(([docNumber, _]) => docNumber)
                .join(' ')
        );
    }
    lineNumber++;
}

function solve() {
    answers.forEach((answer) => process.stdout.write(`${answer}\n`))
}