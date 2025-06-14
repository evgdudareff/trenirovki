// https://contest.yandex.ru/contest/23815/run-report/136327558/

/*
-- ПРИНЦИП РАБОТЫ --
Я реализовал алгоритм быстрой сортировки in-place без задействования дополнительной памяти для хранения
промежуточных данных сортируемых частей массива.
Более подробно принцип работы описан в самой задаче
https://contest.yandex.ru/contest/23815/problems/B/?success=136327558#3484683/2020_05_19/6LnxJCoO7C

Только самые ключевые моменты по быстрой сортировке in-place:
- выбирается опорный элемент (лучше рандомный на каждую итерацию)
- ставим 2 указателя - самый левый и самый правый индексы массива
- пока элемент слева < опорного - двигаем указатель вправо
- пока элемент справа > опорного - двигаем указатель влево
- как только ни левый ни правый указатель не двигается -> значит эти элементы нарушают порядок по отношению к опорному.
  Меняем их местами.
- продолжаем в том же духе, пока левый и правый укзатели не столкнуться
- в итоге, если провести границу по индексу столкновения указателей, то это разделит массив на 2 части: в одной все не меньше
  опорного, в другой не больше опорного.
- вызываем быструю сортировку для каждой из полученных частей рекурсивно

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
Если длина сортируемого массива/участка массива 0 или 1 - то такой массив уже отсортирован. Это базовый случай рекурсии.
Поскольку на каждой итерации мы выбираем опорный элемент, то следующий массив/участок массива для рекурсивной сортировки
уменьшается на 1 элемент. Таким образом, мы придём к базовому случаю. Корректность же верного итогового расположения
элементов определяется принципом работы выше.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
В худшем случае, если массив уже был отсортирован и мы будем каждый раз выбирать первый элемент в качестве опорного, тогда
временная сложность составит O(N^2), где N - длина массива. Поскольку на каждой итерации сортировки у нас будет всегда
получаться одна пустая часть и на N - 1 оставшаяся. На каждом шаге мы проделываем N операций и отсюда квадратичная сложность.

В лучшем случае, если опорный элемент будет делить каждый раз массив пополам, то мы получаем logN глубину рекурсии, что в итоге
с учётом проделанных операций на каждом уровне нам даёт O(N * logN).

Сложность быстрой сортировки в среднем — такая же, как в лучшем случае O(N * logN).

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Сортировка in-place подразумевает, что мы не храним промежуточные массивы в процессе сортировки, что показано в принципе
работы выше. Обмен элементов, нарушающих порядок стоит O(1). Пространственная сложность O(1).
*/

const readline = require('readline');
let n;
let participants = [];
let lineNumber = 0;

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);


function onLineListener(line) {
    if (lineNumber === 0) {
        n = Number(line);
        lineNumber++;
    } else {
        const participant = line.split(' ');
        participants.push([participant[0], Number(participant[1]), Number(participant[2])])
    }
}

function solve() {
    quickSortInPlace(participants, 0, participants.length - 1, isFirstParticipantBefore);
    participants.forEach((participant) => {
        process.stdout.write(`${participant[0]}\n`);
    })
}


function getRandomFromRange(from, to) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
}

// Participant = Array<uniqueLogin: str, P: number, F: number>
function isFirstParticipantBefore([aLogin, aP, aF], [bLogin, bP, bF]) {
    if (aP > bP) {
        return true;
    } else if (aP < bP) {
        return false;
    }

    if (aF < bF) {
        return true;
    } else if (aF > bF) {
        return false;
    }

    return aLogin < bLogin;
}

// arr: Array<Participant>
function quickSortInPlace(arr, l, r, isLeftElementLess) {
    if (l >= r) {
        return;
    }

    let left = l;
    let right = r;
    let pivotIndex = getRandomFromRange(left, right);
    let pivot = arr[pivotIndex];

    while (left < right) {
        while (isLeftElementLess(arr[left], pivot)) {
            left++;
        }

        while (isLeftElementLess(pivot, arr[right])) {
            right--;
        }

        let leftWrongOrderElement = arr[left];
        let rightWrongOrderElement = arr[right];
        arr[right] = leftWrongOrderElement;
        arr[left] = rightWrongOrderElement;
    }

    quickSortInPlace(arr, l, left - 1, isLeftElementLess);
    quickSortInPlace(arr, left + 1, r, isLeftElementLess);
}