// https://contest.yandex.ru/contest/59539/problems/C/

const { createInterface } = require("readline");

// любое число >=4 можно представить как n = 4 * a + b; Где 1 <= b <=3


function getMinNumberOfButtonPressIfNumberBetween1And3(currNumber) {
    if (currNumber >= 1 && currNumber <= 3) {
        if (currNumber === 1) {
            return 1; //1 нажатие space
        } else if (currNumber === 2) {
            return 2; //2 нажатия space
        } else {
            return 2; //1 нажатие tab + 1 нажатие backspace
        }
    }
}

function getMinNumberOfButtonPress(currNumber) {
    if (currNumber === 0) {
        return 0;
    }

    if (currNumber >= 1 && currNumber <= 3) {
        return getMinNumberOfButtonPressIfNumberBetween1And3(currNumber);
    }


    const b = currNumber % 4;
    if (b === 0) {
        return currNumber / 4;
    }

    return ((currNumber - b)/4) + getMinNumberOfButtonPressIfNumberBetween1And3(b);

}

const lines = [];

function solveTestCase(test) {
    let res = 0;
    const [numberOfLines, ...lines] = test.map(Number);

    lines.forEach((line) => {
        res = res + getMinNumberOfButtonPress(line);
    })

    console.log(res);
}



createInterface({
    input: process.stdin,
    output: process.stdout,
}).on("line", (line) => {
    lines.push(line.toString().trim());
}).on("close", () => {
    solveTestCase(lines);
});
