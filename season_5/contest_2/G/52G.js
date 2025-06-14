// https://contest.yandex.ru/contest/59540/problems/G/

const { createInterface } = require("readline");




// let test = [
//     '1',
//     '5',
//     '1 3 3 3 2'];

// let test = [
//     '1',
//     '16',
//     '1 9 8 7 6 7 8 9 9 9 9 9 9 9 9 9',
// ];

// let test = [
//     '1',
//     '7',
// '7 2 3 4 3 2 7'];

function solveTestCase(test){
    debugger;
    const t = Number(test.shift());
    const arrays = [];

    let j = 0;
    test.forEach((item, i) => {
        if (i % 2 === 0) {
            arrays[j] = {n: Number(item)};
        } else {
            arrays[j]['arr'] = item.split(' ').map(Number);
            j++;
        }
    });



    arrays.forEach((array) => {
        let counter = 0;
        let resRanges = [];
        const {n, arr} = array;

        let min = arr[0];
        let currRange = 0;

        for (let i = 0; i < n; ){
            let curr = arr[i];
            if (curr < min) {
                min = curr;
            }

            if (curr >= currRange && (currRange + 1) <= min) {
                currRange++;
                i++;

                if (i === n) {
                    counter++;
                    resRanges.push(currRange);
                }
            } else {
                counter++;
                resRanges.push(currRange);
                min= curr;
                currRange = 0;
            }
        }



        console.log(counter);
        console.log(resRanges.join(' '));
    })



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
