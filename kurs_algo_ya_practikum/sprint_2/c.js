class Node {
    constructor(value = null, next = null) {
        this.value = value;
        this.next = next;
    }
}

function printList(node) {
    let i = 0;

    while (node) {
        process.stdout.write(i === 0 ? `${node.value}` : `  -> ${node.value}`);
        // console.log(`${node.value} -> `);
        node = node.next;
        i++;
    }
}

function getNodeById(head, nodeIndex){
    if (nodeIndex < 0) {
        return null;
    }

    let currNode = head;
    let currIndex = 0;

    while (currIndex < nodeIndex && currNode) {
        currNode = currNode?.next;
        currIndex++;
    }

    return currNode;
}


function removeNode(head, idx) {
    if (idx === 0) {
        const newHead = head.next;
        head.next = null;
        return newHead;
    }

    const prevNode = getNodeById(head, idx - 1);
    const nextNode = getNodeById(head, idx + 1);

    if (!prevNode && !nextNode) {
        return head;
    }

    prevNode.next = nextNode;
    return head;

}

function test() {
    var node3 = new Node("node3");
    var node2 = new Node("node2", node3);
    var node1 = new Node("node1", node2);
    var node0 = new Node("node0", node1);
    printList(node0);
    // result is node0  -> node1  -> node2  -> node3

    process.stdout.write('\n');
    // const newHead = removeNode(node0, 1);
    // printList(newHead);
    // result is node0 -> node2 -> node3


    // const newHead = removeNode(node0, 2);
    // printList(newHead);
    // result is node0 -> node1 -> node3

    const newHead = removeNode(node0, 3);
    printList(newHead);
    // result is node0 -> node1 -> node2

    // const newHead = removeNode(node0, 0);
    // printList(newHead);
    // result is node1 -> node2 -> node3

    // const newHead = removeNode(node0, 5);
    // printList(newHead);
    // result is node0  -> node1  -> node2  -> node3
}

test();