// https://contest.yandex.ru/contest/25597/run-report/139588327/

/*
-- ПРИНЦИП РАБОТЫ --
Я реализовал алгоритм Левенштейна для поиска минимального редакционного расстояния для двух строк.
Иначе говоря, это минимальное количество операций (удаление, вставка, замена) которое нужно произвести, чтобы
получить из одной строки (s) другую строку (t). Для этого можно использовать двумерный массив dp размера s.length x t.length,
причем индекс первого символа каждой строки начинается с 1. Но поскольку мы всегда используем только текущее и предыдущее
состояния, то для оптимизации по памяти будем хранить только их.

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
Базовые состояния:
- dp[0][0] будет всегда равен 0 - пустые строки не отличаются, для них расстояние 0;
- dp[0][j] будет равно j - пустая строка отличается от строки длиной j на расстояние j;
- dp[i][0] будет равно i - аналогично предыдущему утверждению, но наоборот.

Иначе в каждом случае для dp[i][j] мы выбираем, что для нас выгоднее:
- удалить символ dp[i - 1][j] + 1 (плюс 1 здесь означает, что расстояние увеличивается на 1)
- добавить символ dp[i][j - 1] + 1 (плюс 1 здесь означает, что расстояние увеличивается на 1)
- заменить символ dp[i - 1][j - 1]. Причем если текущие символы строк s и t не равны, то мы прибавим еще 1 (поскольку
расстояние увеличивается на 1)

В итоге выбираем то, что выгоднее, то есть берем от этих трёх возможных операций минимальную по величине.
Таким образом заполняем двумерный массив и ответ будет в dp[currI][t.length] (храним только 2 состояния).

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Нужно перебрать все строки и столбцы, то есть O(s.length x t.length).

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Храним только 2 состояния То есть O(2 x t.length). = O(t.length)
*/

const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);


let s, t;
let dp = [];
let lineNumber = 0;

function onLineListener(line) {
    if (lineNumber === 0) {
        s = line.split('');
        lineNumber++;
    } else {
        t = line.split('');
    }
}

function solve() {

    const dp = [
        new Array(t.length + 1).fill(0),
        new Array(t.length + 1).fill(0)
    ];

    let currI;
    for (let i = 0; i <= s.length; i++) {
        currI = i % 2;
        let prevI = 1 - currI;

        let sChar;
        if (i !== 0) {
            sChar = s[i - 1];
        }

        for (let j = 0; j <= t.length; j++) {
            if (i === 0 && j === 0) {
                dp[currI][j] = 0;
                continue;
            }

            if (i === 0 || j === 0) {
                dp[currI][j] = i === 0 ? j : i;
                continue;
            }

            let tChar = t[j - 1];
            let betterRemoveChar = dp[prevI][j] + 1;
            let betterAddChar = dp[currI][j - 1] + 1;
            let betterReplaceChar = dp[prevI][j - 1] + (tChar !== sChar ? 1 : 0);

            dp[currI][j] = Math.min(betterAddChar, betterRemoveChar, betterReplaceChar);
        }
    }

    let maxCommonSeq = dp[currI][t.length];
    process.stdout.write(`${maxCommonSeq}`);
}

