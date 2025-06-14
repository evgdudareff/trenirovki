// https://contest.yandex.ru/contest/27393/problems/A/
var createInterface = require("readline").createInterface;
function solveTestCase(test) {
    var _a = test[0].split(' ').map(Number), tRoom = _a[0], tCond = _a[1];
    var command = test[1];
    var res = null;
    switch (command) {
        case "freeze":
            if (tRoom <= tCond) {
                res = tRoom;
            }
            else {
                res = tCond;
            }
            break;
        case "heat":
            if (tRoom >= tCond) {
                res = tRoom;
            }
            else {
                res = tCond;
            }
            break;
        case "fan":
            res = tRoom;
            break;
        case "auto":
            res = tCond;
            break;
    }
    console.log(res);
}
var lines = [];
createInterface({
    input: process.stdin,
    output: process.stdout
}).on("line", function (line) {
    lines.push(line.toString().trim());
}).on("close", function () {
    solveTestCase(lines);
});
