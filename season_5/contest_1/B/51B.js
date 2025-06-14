// https://contest.yandex.ru/contest/59539/problems/B/

const { createInterface } = require("readline");

// G11 - голов забито в 1-ой игре 1-ой командой
// G12 - голов забито в 1-ой игре 2-ой командой
// G21 - голов забито во 2-ой игре 1-ой командой
// G22 - голов забито во 2-ой игре 2-ой командой

function solveTestCase(test) {
    const [G11, G12] = test[0].split(':').map(Number);
    let [G21, G22] = test[1].split(':').map(Number);
    const isTeam1PlayedFirstGameAtHome = test[2] === '1';

    let res = null;

//   console.log(G11, G12, G21, G22, isTeam1PlayedFirstGameAtHome);

    const team1TotalGoalsAtTheMoment = G11 + G21;
    const team2TotalGoalsAtTheMoment = G12 + G22;


    if (team2TotalGoalsAtTheMoment === 0 && team1TotalGoalsAtTheMoment === 0) {
        res = 1;
    } else if (team2TotalGoalsAtTheMoment >= team1TotalGoalsAtTheMoment) {
        const neededGoalsToEqualScore = team2TotalGoalsAtTheMoment - team1TotalGoalsAtTheMoment;
        G21 = G21 + neededGoalsToEqualScore;

        const team1GoalsInGuestGame = isTeam1PlayedFirstGameAtHome ? G21 : G11;
        const team2GoalsInGuestGame = isTeam1PlayedFirstGameAtHome ? G12 : G22;

        if (team1GoalsInGuestGame > team2GoalsInGuestGame) {
            res = neededGoalsToEqualScore;
        } else {
            res = neededGoalsToEqualScore + 1;
        }
    } else {
        res = 0;
    }

    console.log(res);
}

const lines = [];
createInterface({
    input: process.stdin,
    output: process.stdout,
}).on("line", (line) => {
    lines.push(line.toString().trim());
}).on("close", () => {
    solveTestCase(lines);
});
