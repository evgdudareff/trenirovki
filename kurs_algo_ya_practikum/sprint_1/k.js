const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


let k;
let length = 0;
let x;
let lineNumber = 0;

ioInterface.on('line', line => {
    if (lineNumber === 0) {
        length = Number(line);
    } else if (lineNumber === 1) {
        x = line.split(' ').map(Number);
    } else {
        k = line.split('').map(Number);
    }
    lineNumber++;
});

ioInterface.on('close', solve);

function addTwo(a, b) {
    const str = String(a + b);
    if (str.length === 2) {
        return {res: Number(str[1]), rest: Number(str[0])}
    }
    return {res: Number(str), rest: 0}

}

function mutateBiggestArr(biggerArr, smallerArr) {
    let lastRest = 0;

    for (let i = smallerArr.length - 1, j = biggerArr.length - 1; j >= 0; i--, j--) {
        const currBiggerArrI = biggerArr[j];
        const currSmallerArrI = smallerArr[i];
        const {res, rest} = currSmallerArrI ? addTwo(currBiggerArrI, currSmallerArrI) : {res: currBiggerArrI, rest: 0};
        const {res: summ, rest: summRest} = addTwo(res, lastRest);
        lastRest = summRest || rest;
        biggerArr[j] = summ;
    }


    if (lastRest) {
        const addition = biggerArr.length === smallerArr.length ? lastRest: lastRest + biggerArr[0];
        biggerArr.unshift(addition);
    }

    return biggerArr.join(' ');
}

function solve() {
    let ans;

    if (x.length >= k.length) {
        ans = mutateBiggestArr(x, k);
    } else {
        ans =  mutateBiggestArr(k, x);
    }

    process.stdout.write(ans);

}