// https://contest.yandex.ru/contest/59540/problems/F/

const { createInterface } = require("readline");



// let test = [
//     '97',
// '824 724 847 92 227 680 604 852 200 829 323 156 999 331 217 159 950 506 98 260 967 223 492 126 372 198 913 465 962 105 751 816 729 614 565 820 950 574 460 303 922 682 439 351 779 832 665 526 389 148 802 597 77 234 117 65 290 223 817 670 296 239 242 440 322 936 131 400 643 166 851 635 682 960 65 183 352 840 109 886 526 768 876 573 551 304 871 190 504 220 193 778 416 329 419 59 272',
// '110 120 1'
// ]

// let test = [
//     '5',
// '1 2 3 4 5',
// '15 15 2'];

// let test = [
//     '9',
// '707 805 279 713 584 352 923 1000 237',
// '29 38 1']



function solveTestCase(test){
    debugger;
    let max = 0;
    const n = Number(test[0]);
    const numbers = test[1].split(' ').map(Number);
    let [a, b, k] = test[2].split(' ').map(Number);

    let from = Math.max(Math.ceil(a / k) - 1, 0);
    let to = Math.max(Math.ceil(b / k) - 1, 0);

    const alreadyDoneMoves = {};


    // рассчитать возможные длины ходов по секторам
    for (let i = from; i <= to; i++){
        let correctedI = i >= n ? i % n : i;

        //  если уже делали такой ход, то пошли покругу
        if (alreadyDoneMoves[correctedI]) {
            console.log(max);
            return;
        }

        // перебрать возможные ходы в обе стороны

        let clockWise = numbers.at(correctedI);
        let notClockWise =  numbers.at(-correctedI);

        if (clockWise > max) {
            max = clockWise;
        }

        if (notClockWise > max) {
            max = notClockWise;
        }

        alreadyDoneMoves[correctedI] = true;


    }

    console.log(max);

}

// solveTestCase(test);

const lines = [];
createInterface({
    input: process.stdin,
    output: process.stdout,
}).on("line", (line) => {
    lines.push(line.toString().trim());
}).on("close", () => {
    solveTestCase(lines);
});
