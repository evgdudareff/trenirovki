// https://contest.yandex.ru/contest/59540/problems/B/

const { createInterface } = require("readline");


// let test = ['5 2', '5 4 3 2 1'];

// let test1 = [1, 2, 3];
function findMinMaxDiff(days){
    let results = [];
    let min = days[0];
    let max = null;

    debugger;

    days.forEach((day, i) => {
        if (i === 0){
            return;
        }

        if (max === null && day > min) {
            max = day;
        } else if (max !== null && day > max) {
            max = day;
        } else if (days[i - 1] > day) {
            if (max !== null && min !== null) {
                results.push(max - min);
            }
            max = null;

            if (day < min) {
                min = day;
            }

        }

    });

    if (max !== null && min !== null){
        results.push(max - min);
    }

    if (max === null || min === null) {
        results.push(0);
    }


    let ans = results.sort((a,b) => b - a)[0];
    return ans;

}
// findMinMaxDiff(test1);

function solveTestCase(test){
    let res = [];
    const [N, K] = test[0].split(' ').map(Number);
    const days = test[1].split(' ').map(Number);

    if (K >= days.length) {
        res.push(findMinMaxDiff(days))
    } else {

        let currIndex = 0;

        while (currIndex !== days.length - 1) {
            let currDaysRange = days.slice(currIndex, currIndex + K + 1);
            let currRes = findMinMaxDiff(currDaysRange);
            res.push(currRes)
            currIndex++;
        }
    }


    let ans = res.sort((a,b) => b - a)[0];
    console.log(ans);
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
