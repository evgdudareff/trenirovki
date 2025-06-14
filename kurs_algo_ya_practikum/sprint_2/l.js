const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let numbers;
let start = false;
ioInterface.on('line', line => {
    numbers = line.split(' ').map(Number);
});

ioInterface.on('close', solve);

// умножение матрицы 2х2
// function mull(A,B) {
//     return [
//         [A[0][0] * B[0][0] + A[0][1] * B[1][0], A[0][0] * B[0][1] + A[0][1] * B[1][1]],
//         [A[1][0] * B[0][0] + A[1][1] * B[1][0], A[1][0] * B[0][1] + A[1][1] * B[1][1]]
//     ]
// }

// более быстрая функция
function mull(A, B) {
    const result = [[],[]];
    const a00 = A[0][0], a01 = A[0][1];
    const a10 = A[1][0], a11 = A[1][1];
    const b00 = B[0][0], b01 = B[0][1];
    const b10 = B[1][0], b11 = B[1][1];

    result[0][0] = a00 * b00 + a01 * b10;
    result[0][1] = a00 * b01 + a01 * b11;
    result[1][0] = a10 * b00 + a11 * b10;
    result[1][1] = a10 * b01 + a11 * b11;

    return result;
}

// рекурсивное вычисление числа фибоначчи через разложение степени на двойки
// есть формула для классики, где нулевое число - это 0. В задаче это 1. Поэтому для верного ответа нужно
// будет увеличить переданный n на 1
// [1,1] ^ n = [Fn+1, Fn]
// [1,0]       [Fn, Fn-1]
// то есть нужно возвести матрицу (обозначим ее М) в степень n
// есть разные подходы, для наглядности использую рекурсию
function fib_recursive_matrix(M, n) {
    if (n === 0n){
        // единичная матрица, аналогия "1" в мире матриц
        return [
            [1n,0n],
            [0n,1n]
        ]
    }

    // чётное
    if (n % 2n === 0n) {
        const halfNResultPowerM = fib_recursive_matrix(M, n / 2n)
        return mull(halfNResultPowerM, halfNResultPowerM);
    } else {
        // нечётное
        return mull(M, fib_recursive_matrix(M, n - 1n));
    }

}


// рекурсивная работает чуть медленнее, делаем иначе
function fib_matrix(M, n) {
    let result = [
        [1n,0n],
        [0n,1n]
    ];
    while (n > 0) {
        if( n % 2 === 1) {
            result = mull(result, M)
        }
        M = mull(M, M)
        n = Math.floor(n / 2);

    }
    return result
}

function simple_fib(n, mod) {
    if (n <= 1) {
        return 1;
    }

    let i = 2;
    let curr = 1n;
    let prevPrev = 1n;
    let prev = 1n;

    while (i <= n) {
        curr = (prev + prevPrev) % mod;
        prevPrev = prev;
        prev = curr;
        i++;
    }

    return curr;
}


function solve() {
    let [l, k] = numbers;
    const n = BigInt(l);
    const mod = BigInt(10 ** k);  // 10^k

    if (n === 0n || n === 1n) {
        process.stdout.write('1');
        return;
    }

    process.stdout.write(String(simple_fib(n, mod)));
    //console.timeEnd("fibonacci");
}