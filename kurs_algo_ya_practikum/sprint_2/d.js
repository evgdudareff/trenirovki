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

function getNodeByValue(node, elem) {
    let currValue = node.value;
    let currNode = node;
    let currIndex = 0;

    while (currNode.next && currValue !== elem) {
        currNode = currNode.next;
        currValue = currNode?.value;
        currIndex++;
    }

    return currValue === elem? currIndex : -1;
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

    console.log(`${getNodeByValue(node0, "node0")}\n`);
    console.log(`${getNodeByValue(node0, "node1")}\n`);
    console.log(`${getNodeByValue(node0, "node2")}\n`);
    console.log(`${getNodeByValue(node0, "node3")}\n`);
    console.log(`${getNodeByValue(node0, "node4")}\n`);


}

test();