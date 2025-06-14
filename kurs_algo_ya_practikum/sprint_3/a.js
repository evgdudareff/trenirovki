const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);

let n;
const validBrackets = [];
function onLineListener (line) {
    n = Number(line)
}

function isValidBracketSeq(arr) {
    let balance = 0;
    let prevBracket = ''

    for (let i = 0; i <= arr.length - 1; i++) {
        const currBracket = arr[i];
        if (currBracket === '(') {
            balance = balance + 1;
        } else if (currBracket === ')') {
            balance = balance - 1;
            if (balance < 0) {
                return null;
            }
        }
        prevBracket = currBracket;
    }

    if (balance > 0) {
        return null;
    }

    return arr.join('');

}

function makeBrackets(n, bracketsArr) {
    if (n === 0) {
        const ans = isValidBracketSeq(bracketsArr);
        if (ans !== null) {
            validBrackets.push(ans);
        }
        return bracketsArr;
    }

    makeBrackets(n - 1, [...bracketsArr, '(']);
    makeBrackets(n - 1, [...bracketsArr, ')']);


}

function solve() {

    if (n ===0) {
        process.stdout.write('');
        return;
    }

    makeBrackets(2*n, []);
    const sortedBrackets = validBrackets.sort((a, b) => {
        if (a === '(') {
            return -1;
        } else {
            return 1;
        }
    });

    for (let i = 0; i <= sortedBrackets.length - 1; i++) {
        process.stdout.write(`${sortedBrackets[i]}\n`);
    }

}


// const cases = [
//     ['(', '(', ')', ')'],//true
//     ['(', ')', '(', ')'],//true
//     ['('], //false,
//     [')'], //false,
//     ['(', '('], //false
//     ['(', ')'],//true
//     ['(', '(', '(', '(', ')', '(', ')',')',')'],//false
//     ['(', '(', '(', '(', ')', '(', ')',')',')', ')'],//true
//
// ]

// function test(){
//     for (i =0; i <= cases.length - 1; i++) {
//         const ans = isValidBracketSeq(cases[i]);
//         if (ans !== null) {
//             const [str, sortPower] = ans;
//             process.stdout.write(`true : ${str} : ${sortPower}`);
//         } else {
//             process.stdout.write(`false`);
//         }
//
//     }
//
//     // process.stdout.write('');
// }

// test();