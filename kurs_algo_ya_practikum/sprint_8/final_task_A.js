// https://contest.yandex.ru/contest/26133/run-report/139970810/

/*
-- ПРИНЦИП РАБОТЫ --
Я реализовал алгоритм поиска наибольшего общего префикса из набора запакованных строк.

На вход поступают запакованные строки, которые предварительно нужно распаковать. Эту часть работы выполняет функция
unpackString, которая парсит строку символ за символом и кладёт их в стэк для скобок, чисел-мультипликаторов и букв.
Это нужно для того, чтобы иметь возможность запоминать операнды и, вынимая из стека буквы и мультипликаторы, применять
их, создавая итоговую строку.

Затем распакованные строки подаются на вход функции findLongestCommonPrefix, которая ищет наибольший общий префикс.
Суть в том, что если у нас 1 строка, то она же и будет наибольшим общим префиксом. Если 2 строки, то мы посимвольно
проверяем их до тех пор, пока символы в них равны. Как только очередные символы не равны, то мы возвращаем их общий префикс.
Если у нас больше 2 строк, то на вход findLongestCommonPrefix сначала подаются 2 первые строки, что даст нам их наибольший
общий префикс, который мы передам опять в findLongestCommonPrefix вместе с третьей строкой. И так далее, пока в наборе
еще есть строки.

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
Поскольку по условию задачи нужно найти наибольший общий префикс, то из определения следует, что он есть у всех строк
из набора. Поэтому логично, что
findLongestCommonPrefix(str1, str2, str3) = findLongestCommonPrefix(findLongestCommonPrefix(str1, str2), str3).

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Распаковка строки выполняется за линейное время, если L - максимальная длина строки, то O(L).
Поиск общего префикса для 2 строк занимает тоже O(L) времени. Если строк у нас n, то нужно провести n таких сравнений, что
даст нам O(n * L). Итого O(L) + O(n * L).

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Мы не храним все строки, а сразу после распаковки ищем наибольший общий префикс. Если считать, что храним только
текущий префикс и текущую распакаованную строку, то получается O(L) + O(L) = O(L) памяти.
*/

const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);


let n;
let longestCommonPrefix;
let lineNumber = 0;

function unpackString(str) {
    let multipliers = [];
    let brackets = [];
    let chars = [];

    for (let i = 0; i < str.length; i++) {
        let currChar = str[i];
        if (currChar === '[') {
            brackets.push(currChar);
        } else if (currChar === ']') {
            let lastBracket = brackets[brackets.length - 1];
            if (lastBracket === '[') {
                brackets.pop();
                let lastMultiplier = multipliers.pop() ?? 1;
                let lastChar = chars.pop() ?? '';
                let currResult = lastChar.repeat(lastMultiplier);
                if (chars.length) {
                    chars[chars.length - 1] = chars[chars.length - 1] + currResult;
                } else {
                    chars[0] = currResult;
                }
            } else {
                brackets.push(currChar);
            }
        } else if (Number.isInteger(Number(currChar))) {
            multipliers.push(Number(currChar));
            chars.push('');
        } else {
            if (chars.length) {
                chars[chars.length - 1] = chars[chars.length - 1] + currChar;
            } else {
                chars[0] = currChar;
            }
        }
    }

    return chars.join('');
}

function findLongestCommonPrefix(str1, str2) {
    if (str1 === '' || str2 === '') {
        return '';
    }

    let idx = 0;
    let minLength = Math.min(str1.length, str2.length);

    for (let i = 0; i < minLength; i++) {
        if (str1[i] === str2[i]) {
            idx++;
        } else {
            break;
        }
    }

    return str1.substring(0, idx);
}

function onLineListener(line) {
    if (lineNumber === 0) {
        n = Number(line);
        lineNumber++;
    } else {
        if (!longestCommonPrefix) {
            longestCommonPrefix = unpackString(line);
        } else {
            longestCommonPrefix = findLongestCommonPrefix(longestCommonPrefix, unpackString(line));
        }
    }
}

function solve() {
    process.stdout.write(longestCommonPrefix);
}