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

    if (!root) {
        return 0;
    }

    if (root.left === null && root.right === null) {
        return root.value;
    }

    let maxLeft = root.left === null ? 0 : Math.max(root.value, solution(root.left));
    let maxRight = root.right === null ? 0 : Math.max(root.value, solution(root.right));

    return Math.max(maxLeft, maxRight);
}

function test() {
    var node1 = new CNode(7880);
    var node2 = new CNode(0);
    var node3 = new CNode(0);
    node3.left = node1;
    node3.right = node2;
    var node4 = new CNode(2000);
    node4.left = node3;
    console.log(solution(node4));
}

test();