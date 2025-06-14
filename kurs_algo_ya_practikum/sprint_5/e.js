if (process.env.REMOTE_JUDGE !== 'true') {
    class CNode {
        constructor(value, left = null, right = null) {
            this.value = value;
            this.left = left;
            this.right = right;
        }
    }
}

function solution(root) {
    // Your code
    // “ヽ(´▽｀)ノ”

    function checkSubTree(node, predicate){
        if (!node) {
            return true;
        }

        if (node.left === null && node.right === null){
            return predicate(node.value);
        }

        let leftCheck = true;
        if (node.left !== null) {
            leftCheck = node.left.value < node.value ? checkSubTree(node.left, predicate): false;
        }

        let rightCheck = true;
        if (node.right !== null) {
            rightCheck = leftCheck && node.right.value > node.value ? checkSubTree(node.right, predicate): false;
        }

        return leftCheck && rightCheck;
    }

    if (root.left === null && root.right === null) {
        return true;
    }

    if (root.left !== null && root.left.value >= root.value) {
        return false;
    }

    if (root.right !== null && root.right.value <= root.value) {
        return false;
    }

    let isLeftBST = checkSubTree(root.left, (leafValue) => leafValue < root.value);
    let isRightBST = isLeftBST && checkSubTree(root.right, (leafValue) => leafValue > root.value);

    return isRightBST;

}


function test() {
    var node1 = new CNode(1, null, null);
    var node2 = new CNode(4, null, null);
    var node3 = new CNode(3, node1, node2);
    var node4 = new CNode(8, null, null);
    var node5 = new CNode(5, node3, node4);
    console.assert(solution(node5));
    node4.value = 5;
    console.assert(!solution(node5));
}