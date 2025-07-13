const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
ioInterface.on('line', onLineListener);
ioInterface.on('close', solve);


let lineNumber = 0;
let s, t;

function onLineListener(line) {
    if (lineNumber === 0) {
        s = line;
    } else if (lineNumber === 1) {
        t = line;
    }
    lineNumber++;
}

function solve() {
    if (s === t) {
        process.stdout.write('OK');
        return;
    }

    if (Math.abs(s.length - t.length) > 1) {
        process.stdout.write('FAIL');
        return;
    }

    let i = 0;
    let j = 0;
    let ops = 0;

    while ((i < s.length || j < t.length) && ops <= 1) {
        let sChar = s[i];
        let tChar = t[j];

        if (sChar === tChar) {
            i++;
            j++;
            continue;
        }

        if (!sChar && tChar) {
            ops++;
            j++;
            continue;
        }

        if (sChar && !tChar) {
            ops++;
            i++;
            continue;
        }

        let nextSChar = s[i + 1];
        let nextTChar = t[j + 1];

        if (!nextSChar && nextTChar) {
            ops++;
            j++;
            continue;
        }

        if (nextSChar && !nextTChar) {
            ops++;
            i++;
            continue;
        }


        if (nextTChar && nextSChar) {
            if (sChar === nextTChar) {
                ops++;
                j++;
                continue;
            }
            if (tChar === nextSChar) {
                ops++;
                i++;
                continue;
            }
            // замена
            ops++;
            i++;
            j++;
        } else {
            break;
        }
    }


    process.stdout.write(ops <= 1 ? 'OK' : 'FAIL');

}
