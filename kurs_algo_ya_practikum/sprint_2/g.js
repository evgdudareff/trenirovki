const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


class StackMaxEffective {
    constructor() {
        this.max;
        this.maxArr = [];
        this.items = [];
    }

    top(){
        const stackLength = this.items.length;
        if (!stackLength) {
            return 'error';
        }
        return this.items[stackLength - 1];

    }

    push(x){
        if (this.max === undefined || x > this.max) {
            this.max = x;
            this.maxArr.push(x);
        } else if (this.max >= x) {
            this.maxArr.push(this.max);
        }

        this.items.push(x);
    }

    pop() {
        const item = this.items.pop();
        if (item === undefined) {
            return 'error';
        }

        const topElement = this.maxArr.pop();
        if (topElement !== undefined) {
            this.max = this.maxArr[this.maxArr.length - 1]
        }
    }

    get_max() {
        return this.max !== undefined ? String(this.max) : 'None';
    }

}

let lineNumber = 0;
const output = [];
const stackMax = new StackMaxEffective();

ioInterface.on('line', line => {
    if (lineNumber !== 0) {
        const [command, arg] = line.split(' ');
        const result = commandInterpreter(stackMax, command, arg);
        result && output.push(result);
    }
    lineNumber++;
});

ioInterface.on('close', solve);


function commandInterpreter(stackMax, command, arg = null){
    if (command === 'push' && arg !== null) {
        return stackMax.push(Number(arg));
    } else if (command === 'pop') {
        return stackMax.pop();
    } else if (command === 'get_max'){
        return String(stackMax.get_max());
    } else if (command === 'top') {
        return String(stackMax.top());
    }

}

function solve(){
    process.stdout.write(output.join('\n'));
}

