class Node {
    constructor(value = null, next = null, prev = null) {
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}

function getTailNode(head) {
    let currNode = head;

    while (currNode.next) {
        currNode = currNode.next;
    }

    return currNode;
}

function solution(node) {
     const newHead  = getTailNode(node);

     let currNode = newHead;
     let stop = false;
     while (!stop) {
         if (!currNode.prev) {
             stop = true;
         }

         const oldNext = currNode.next;
         const oldPrev = currNode.prev;

         currNode.next = oldPrev;
         currNode.prev = oldNext;
         currNode = oldPrev;
     }

    return newHead;

}

function test() {
    const node3 = new Node("node3");
    const node2 = new Node("node2", node3);
    const node1 = new Node("node1", node2);
    const node0 = new Node("node0", node1);

    node1.prev = node0;
    node2.prev = node1;
    node3.prev = node2;
    const newHead = solution(node0);
    console.log(newHead.value);
    /*
    result is newHead === node3
    node0.prev === node1
    node1.next === node0
    node1.prev === node2
    node2.next === node1
    node2.prev === node3
    node3.next === node2
    */


}

test();