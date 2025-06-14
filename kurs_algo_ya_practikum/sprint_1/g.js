const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


let number;


ioInterface.on('line', line => {
    number = Number(line);
});

ioInterface.on('close', solve)

function solve() {

    if (number === 0){
        process.stdout.write('0');
        return;
    }

    let answer = '';
    let restOfDivision;
    while (number !== 0) {
        restOfDivision = number % 2;
        answer = restOfDivision + answer;
        number = Number(Math.floor(number / 2).toFixed(0));
    }

    process.stdout.write(answer);

}