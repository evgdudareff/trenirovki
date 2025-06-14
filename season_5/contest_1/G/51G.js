// https://contest.yandex.ru/contest/59539/problems/G/

const { createInterface } = require("readline");

// let test = ['2500' ,'5000', '2499'];
let answers = [];

function solveTestCase(test, memo) {

    let [x, y, p, roundTest = null] = memo? memo: test.map(Number);
    let enemySoldersPerRound = p;

    if (x === 0 && p > 0) {
        if (memo) {
            return - 1;
        }
        console.log(-1);
        return;
    }

    let round = roundTest|| 0;;

    if (round === 0) {
        // бьем по казарме
        y = Math.max(y - x, 0);

        p = 0;
        round = 1;

        if (y === 0 && p === 0) {
            console.log(1);
            return;
        }

    }


    while (x > 0 && (y || p) && round!=-1){

        if (round === 1) {
            p = enemySoldersPerRound;
        }

        if (y > 0) {

            if (x - y >= 0) {
                // числа фибоначчи: P(i+1) + X(i+1) == Xi. В этом случае нужно бить казарму и победишь. Но нужно проверить, что это действительно числа фибоначчи.
                //  Для этого еще сравним с золотым сечением 1.618. Отношение чисел фибоначчи должно стремиться к этом числу
                // в этом случае мы сначала бьем казарму,а потом остатками сил бьем по солдатам врага
                let nextRoundP = Math.max(p - (x - y), 0);
                let nextRoundX = Math.abs(nextRoundP - x);
                let ratio = nextRoundP / nextRoundX;

                //   не факт, что мы правы, нужно будет проверить. Если мы не правы, то в этом раунде не бьем казарму
                let nearGoldenRatio =  ratio <= 1.61803398875;
                //   console.log(ratio);
                if (nearGoldenRatio) {
                    //сначала бьем казарму
                    // осталось сил для удара
                    let attackCount = Math.max(x - y, 0);
                    let currY = 0;

                    // оставшимися силами бьем по врагу
                    let pLeft = Math.max(p - attackCount, 0);


                    // контратак врага
                    let currX = Math.max(x - pLeft, 0);
                    let currP = pLeft;


                    // прошёл +1 раунд, это надо запомнить
                    let currRoundBranch = solveTestCase(undefined, [currX,currY, currP, round + 1]);

                    if (currRoundBranch !== -1) {
                        answers.push(currRoundBranch);

                    } else {
                        if (memo) {
                            return - 1;
                        }

                    }

                }
            }


        }


        //иначе сначала бьем солдат врага
        let attackCount = x;
        let pLeft = Math.max(p - attackCount, 0);

        // осталось сил для удара
        attackCount = Math.max(attackCount - p, 0);

        // оставшимися силами бьем по казарме
        y = Math.max(y - attackCount, 0);

        // контратак врага
        x = Math.max(x - pLeft, 0);

        if (x === 0) {
            round = -1;

            if (memo) {
                return round;
            }

            answers.push(-1);
        }

        // если казарма не разрушена
        if (y > 0) {
            // генерация вражеских солдат казармой
            p = pLeft + enemySoldersPerRound;
        } else {
            p = pLeft;
        }


        if (round > 0 && y > 0  && x === p) {
            round = -1;
            break;
        }



        round++;

    }


    if (memo) {
        return round;
    }

    let res = answers.sort((a, b) => a - b).filter((a) => a !== -1);
    console.log(res.length > 0 ? res[0] : -1);
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
