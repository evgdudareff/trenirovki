const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

class LinkedNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class MyLinkedQueue {
    constructor() {
        this.queueSize = 0;
        this.head = null;
        this.tail = null;
    }

    put(value){
        const newNode = new LinkedNode(value);

        if (!this.head) {
            this.head = newNode;
        }

        if (!this.tail) {
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this.queueSize++;
    }


    get(){
        if (this.size() === 0) {
            return 'error';
        }

        const popNode = this.head;
        this.head = popNode.next;
        this.queueSize--;

        return popNode.value;

    }


    size(){
        return this.queueSize;
    }
}


let lineNumber = 0;
const output = [];
let queue = new MyLinkedQueue();

ioInterface.on('line', line => {
    if (lineNumber > 0) {
        const [command, arg] = line.split(' ');
        const result = commandInterpreter(queue, command, arg);
        result && output.push(result);
    }
    lineNumber++;
});

ioInterface.on('close', solve);


function commandInterpreter(queue, command, arg = null){
    if (command === 'put' && arg !== null) {
        return queue.put(Number(arg));
    } else if (command === 'get') {
        return String(queue.get());
    } else if (command === 'size'){
        return String(queue.size());
    }

}

function solve(){
    process.stdout.write(output.join('\n'));
}

