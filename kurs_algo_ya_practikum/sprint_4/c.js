const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);

let s;
let t;
let lineNumber = 0;


function onLineListener (line) {
    if (lineNumber === 0) {
        s = line;
        lineNumber++;
    } else {
        t = line;
    }

}

// abacaba
// xhxixhx

function solve() {
    if (s.length !== t.length) {
        process.stdout.write('NO');
        return;
    }

    const dictS = {};
    const dictT = {};
    let hasConflict = false;

    for (let i = 0; i < s.length; i++) {
        let currS = s[i];
        let currT = t[i];

        if (!(currS in dictS)) {
            dictS[currS] = currT;
        } else if (currS in dictS && dictS[currS] !== currT) {
            hasConflict = true;
            break;
        }

        if (!(currT in dictT)) {
            dictT[currT] = currS;
        } else if (currT in dictT && dictT[currT] !== currS) {
            hasConflict = true;
            break;
        }

    }

    process.stdout.write(hasConflict ? 'NO' : 'YES');
}

