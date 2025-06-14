const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);


let n;
const possibleCombinations = [];

function onLineListener(line) {
    n = Number(line);
}

/// это всё не проходит по времени
function makeCombination(str, arr, n) {
    if (n === arr.length - 1) {
        possibleCombinations.push(str);
        return;
    }

    for (let i = 0; i < arr.length; i++) {
        if (str.includes(arr[i])) {
            continue;
        }
        makeCombination(`${str},${arr[i]}`, arr, n + 1)
    }
}

function isSameBSTCheck(str1, str2) {
    const arr1 = str1.split(',').map(Number);
    const arr2 = str2.split(',').map(Number);

    if (arr1[0] !== arr2[0]) {
        return false;
    }
    return isSameBST(arr1, arr2, 0, 0, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);

}

function isSameBST(arr1, arr2, i, j, min, max) {
    let arr1Idx;
    let arr2Idx;
    let n = arr1.length;

    for (arr1Idx = i; arr1Idx < n; arr1Idx++) {
        if (arr1[arr1Idx] > min && arr1[arr1Idx] < max) {
            break;
        }
    }

    for (arr2Idx = j; arr2Idx < n; arr2Idx++) {
        if (arr2[arr2Idx] > min && arr2[arr2Idx] < max) {
            break;
        }
    }

    if (arr1Idx === n && arr2Idx === n) {
        return true;
    }


    if ((arr1Idx === n && arr2Idx !== n) || (arr1Idx !== n && arr2Idx === n) || arr1[arr1Idx] !== arr2[arr2Idx]) {
        return false;
    }

    const isLeftSubtreeBST = isSameBST(arr1, arr2, arr1Idx + 1, arr2Idx + 1, arr1[arr1Idx], max);
    const isRightSubtreeBST = isSameBST(arr1, arr2, arr1Idx + 1, arr2Idx + 1, min, arr1[arr1Idx]);
    return isLeftSubtreeBST && isRightSubtreeBST;
}

function getUniqueBSTs(possibleCombinations) {
    const unique = [];

    for (let i = 0; i < possibleCombinations.length; i++) {
        let currTree = possibleCombinations[i];
        let isUnique = true;

        for (let j = 0; j < unique.length; j++) {
            if (isSameBSTCheck(currTree, unique[j])) {
                isUnique = false;
                break;
            }
        }

        if (isUnique) {
            unique.push(currTree);
        }
    }
    return unique.length;
}

function oldSolve() {
    if (n === 1) {
        process.stdout.write('1');
        return;
    }

    let numbers = new Array(n).fill(0).map((_, index) => index + 1);

    for (let i = 0; i < numbers.length; i++) {
        makeCombination(`${numbers[i]}`, numbers, 0)
    }

    const ans = getUniqueBSTs(possibleCombinations);

    process.stdout.write(String(ans));
}
///

function factor(n) {
    if (n <= 1) {
        return 1;
    }
    return n * factor(n - 1);
}

function catalan(n) {
    return factor(2 * n) / (factor(n + 1) * factor(n));
}

function solve() {
    let ans = Math.ceil(catalan(n));
    process.stdout.write(String(ans));

}
