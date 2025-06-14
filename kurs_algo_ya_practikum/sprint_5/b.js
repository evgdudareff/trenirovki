// if (process.env.REMOTE_JUDGE !== 'true') {
    class CNode {
        constructor(value) {
            this.value = value;
            this.left = null;
            this.right = null;
        }
    }
// }

function solution(root) {
    // Your code
    // “ヽ(´▽｀)ノ”

    function checkBalance(node) {
        if (node === null) {
            return 0;
        }

        let leftNodeDeep = checkBalance(node.left);
        let rightNodeDeep = checkBalance(node.right);

        if (leftNodeDeep === -1 || rightNodeDeep === -1 || Math.abs(leftNodeDeep - rightNodeDeep) > 1) {
            return -1;
        }

        return Math.max(leftNodeDeep, rightNodeDeep) + 1;

    }

    return checkBalance(root) !== -1

}

function test() {
    // False
    // var node0 = new CNode(0);
    // var node1 = new CNode(1);
    // var node2 = new CNode(2);
    // var node3 = new CNode(3);
    // var node4 = new CNode(4);
    // var node5 = new CNode(5);
    // var node6 = new CNode(6);
    // var node7 = new CNode(7);
    // var node8 = new CNode(8);
    // node0.left = node1;
    // node0.right = node2;
    // node1.left = node3;
    // node1.right = null;
    // node2.left = null;
    // node2.right = node4;
    // node3.left = node5;
    // node3.right = node6;
    // node4.left = node7;
    // node4.right = node8;
    // var root = node0;
    // console.log(solution(root));


    // True
    // var node1 = new CNode(1);
    // var node2 = new CNode(-5);
    // var node3 = new CNode(3);
    // node3.left = node1;
    // node3.right = node2;
    // var node4 = new CNode(10);
    // var node5 = new CNode(2);
    // node5.left = node3;
    // node5.right = node4;
    // console.log(solution(node5));


    // False
    var node0 = new CNode(0);
    var node1 = new CNode(1);
    var node2 = new CNode(2);
    var node3 = new CNode(4);
    node0.left = null;
    node0.right = node1;
    node1.left = node2;
    node1.right = node3;
    var root = node0;
    console.log(solution(root));

    //True
    // var node0 = new CNode(0);
    // var root = node0;
    // console.log(solution(root));
}

test();