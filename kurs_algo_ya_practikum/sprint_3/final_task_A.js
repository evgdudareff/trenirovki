// https://contest.yandex.ru/contest/23815/run-report/136276105/

/*
-- ПРИНЦИП РАБОТЫ --
Изначально массив был отсортирован по возрастанию и затем был сдвинут.
Значит, если понять, чему равен этот сдвиг, то можно изначальный массив представить как два отсортированных массива,
которые образуются разделением исходного массива по границе сдвига.
Тогда можно воспользоваться бинарным поиском в обоих массивах.

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
По условию дана отсортированная последовательность длиной N: a1, a2, ... an, причем значения в ней уникальны.
Обозначим средний элемент как midEl, начальный индекс 0, конечный индекс N - 1. Если массив не был сдвинут, то
выполняется условие a[0] < midEl < a[N - 1], то есть сдвиг равен начальному индексу массива.
Иначе массив был сдвинут - выполняется одно из условий:
1) если a[0] > midEl, то сдвиг лежит левее
2) если midEl > a[N - 1] , то сдвиг лежит правее
Следовательно, можно найти сдвиг, используя условия выше и бинарный поиск.

Затем, если сдвиг равен 0, то используем бинарный поиск по всему массиву.
Если сдвиг не равен 0, то условно разделим массив на 2 подмассива (которые получается отсортированы) и будем искать ответ
в них.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Временная сложность в лучшем случае, если сдвиг равен 0 - O(logN), поскольку мы получаем shift == 0 за время O(1).
В худшем случае, если нужно найти сдвиг, O(logN) + O(logN) = O(logN)
(где N - это длина массива).


-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Кроме самого массива и индексов ничего хранить не требуется. Поэтому O(N), где N - это длина массива.
*/

function getArrShiftIndex(arr) {
    let left = 0;
    let right = arr.length - 1;
    let shift = 0;

    while (left <= right) {
        let midIndex = Math.floor((left + right) / 2);
        let leftElement = arr[left];
        let rightElement = arr[right];
        let midElement = arr[midIndex];

        if (leftElement > midElement) {
            right = midIndex;
        } else if (rightElement < midElement) {
            left = midIndex + 1;
        } else {
            shift = left;
            break
        }
    }

    return shift;
}

function binarySearch(arr, l, r, k) {
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

        if (midEl > k) {
            right = midIndex;
        } else {
            left = midIndex + 1;
        }
    }

    return ans;
}

function brokenSearch(arr, k) {
    const arrLength = arr.length;
    let searchResult;

    const shift = getArrShiftIndex(arr);
    if (shift === 0) {
        searchResult = binarySearch(arr, 0, arrLength - 1, k);
    } else {
        searchResult = binarySearch(arr, 0, shift - 1, k) ?? binarySearch(arr, shift, arrLength - 1, k);
    }

    return searchResult === null ? -1 : searchResult;
}

function test() {
    const arr = [19, 21, 100, 101, 1, 4, 5, 7, 12];
    if (brokenSearch(arr, 5) !== 6)  {
        console.error("WA");
    }
}