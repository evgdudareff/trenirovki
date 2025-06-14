// https://contest.yandex.ru/contest/23815/run-report/136344370/

/*
-- ПРИНЦИП РАБОТЫ --
Изначально массив был отсортирован по возрастанию и затем был сдвинут.
Взяв средний элемент массива midEl можно увидеть, что одна из частей (либо обе части) массива будет отсортирована.
Это легко проверить, сравнив начальный элемент массива arr[0] и  midEl или конечный arr[N - 1] и midEl.
Тогда можно сразу проверить, входит ли искомый элемент в отсортированную часть и если входит, то начать бинарный поиск
там. Иначе пойти искать в другую неотсортированную часть.

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
По условию дана отсортированная последовательность длиной N: a1, a2, ... an, причем значения в ней уникальны.
Обозначим средний элемент как midEl, начальный индекс 0, конечный индекс N - 1. Чтобы понять, какая из частей массива
отсортирована будем всегда проверять начальный и средний элемент: если a[0] < midEl, то левый массив отсортирован,
а правый нет. Если искомый лежит в отсортированной части - идём туда. Иначе стоит поискать в неотсортированной.
Используем бинарный поиск.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Определение, какой массив отсортирован и выбор дальнейшего движения определяется за O(1). Бинарый поиск работает за
O(logN), где N - это длина массива.


-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Кроме самого массива и индексов ничего хранить не требуется. Поэтому O(N), где N - это длина массива.
*/


function rotatedArrayBinarySearch(arr, l, r, k) {
    let left = l;
    let right = r;
    let ans = null;

    while (left <= right) {
        if (left === right) {
            if (arr[left] === k) {
                ans = left;
            }
            break;
        }

        let midIndex = Math.floor( (left + right) / 2);
        let midEl = arr[midIndex];
        if (midEl === k) {
            ans = midIndex;
            break;
        }

        const isLeftPartSorted = midEl >= arr[left];
        if (isLeftPartSorted) {
            if (k >= arr[left] && k < midEl) {
                right = midIndex;
            } else {
                left = midIndex + 1;
            }
        } else {
            if (k <= arr[right] && k > midEl) {
                left = midIndex + 1;
            } else {
                right = midIndex;
            }
        }
    }

    return ans;
}

function brokenSearch(arr, k) {
    const arrLength = arr.length;
    let searchResult = rotatedArrayBinarySearch(arr, 0, arrLength - 1, k);
    return searchResult === null ? -1 : searchResult;
}

function test() {
    const arr = [19, 21, 100, 101, 1, 4, 5, 7, 12];
    if (brokenSearch(arr, 5) !== 6)  {
        console.error("WA");
    }
}