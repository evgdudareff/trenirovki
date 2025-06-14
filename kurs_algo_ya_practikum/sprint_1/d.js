const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


let lineIndex = 0;
let n;
let days;

ioInterface.on('line', line => {
    if (lineIndex === 0) {
        n = Number(line);
    } else {
        days = line.split(' ').map(Number);
    }
    lineIndex++;
});

ioInterface.on('close', solve)

function solve() {
    let answer = 0;

    if (n === 1) {
        process.stdout.write('1');
        return;1
    } else {
        for (let i = 0; i < n; i++) {
            const currDay = days[i];
            if (i === 0 && currDay > days[i + 1]) {
                answer++;
            } else if (i === n - 1 && currDay > days[i - 1]) {
                answer++;
            } else if (currDay > days[i - 1] && currDay > days[i + 1] ) {
                answer++
            }
        }

    }
    process.stdout.write(String(answer));

}