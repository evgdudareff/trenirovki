const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


let number;

ioInterface.on('line', line => {
    number = Number(line);
});

ioInterface.on('close', solve);

function getLogBase2(x) {
    return Math.log(x) / Math.log(4);
}

function solve() {

    let answer = 'True';
    const res = getLogBase2(number);
    if (res < 0 || String(res).includes('.')){
        answer =  'False'
    }


    process.stdout.write(answer);

}