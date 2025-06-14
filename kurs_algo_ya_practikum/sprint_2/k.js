const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let n;

ioInterface.on('line', line => {
    n = Number(line);
});

ioInterface.on('close', solve);


function recursiveFib(n){
    if (n <= 1) {
        return 1;
    }

    return recursiveFib(n - 1) + recursiveFib(n - 2);
}


function solve(){
    let ans = recursiveFib(n);
    process.stdout.write(String(ans));
}

