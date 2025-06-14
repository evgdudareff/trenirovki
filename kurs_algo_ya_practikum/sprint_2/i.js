const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


class MyQueueSized {
    constructor(maxSize) {
        this.maxSize = maxSize;
        this.head = 0;
        this.tail = 0;
        this.queue = Array(maxSize).fill(null);
        this.queue_size = 0;
    }

    push(x){
        if (this.queue_size === this.maxSize) {
            return 'error';
        }
        this.queue[this.tail] = x;
        this.tail = (this.tail + 1) % this.maxSize;
        this.queue_size = this.queue_size + 1;
    }

    pop() {
        if (this.queue_size === 0) {
            return 'None';
        }

        const item = this.queue[this.head];
        this.queue[this.head] = null;
        this.head = (this.head + 1) % this.maxSize;
        this.queue_size = this.queue_size - 1;
        return item;

    }

    peek() {
        if (this.queue_size === 0) {
            return 'None';
        }
        return this.queue[this.head];
    }

    size() {
        return this.queue_size;
    }

}

let lineNumber = 0;
const output = [];
let queue;

ioInterface.on('line', line => {
    if (lineNumber === 1) {
        queue = new MyQueueSized(Number(line));
    } else if (lineNumber > 1) {
        const [command, arg] = line.split(' ');
        const result = commandInterpreter(queue, command, arg);
        result && output.push(result);
    }
    lineNumber++;
});

ioInterface.on('close', solve);


function commandInterpreter(queue, command, arg = null){
    if (command === 'push' && arg !== null) {
        return queue.push(Number(arg));
    } else if (command === 'pop') {
        return String(queue.pop());
    } else if (command === 'size'){
        return String(queue.size());
    } else if (command === 'peek') {
        return String(queue.peek());
    }

}

function solve(){
    process.stdout.write(output.join('\n'));
}

