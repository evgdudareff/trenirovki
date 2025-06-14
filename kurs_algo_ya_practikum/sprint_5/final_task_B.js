// Контест обновился и теперь нельзя вот так скопировать ссылку на посылку. Скопировал айди посылки и вставил в 2 разные ссылки:
// первая, как раньше урл выглядел. Вторая, как наставник рекомендовал. Первая ссылка всё равно открывает сразу две задачи. Вторая
// мне не доступна. 3-ссылка это скопировал урл из контеста (у меня ок открылось, но не выбирается JS по-умолчанию)

// https://contest.yandex.ru/contest/24810/run-report/138397897
// https://admin.contest.yandex.ru/submissions/138397897
// https://new.contest.yandex.ru/contests/24810/problem?id=51450%2F2021_02_03%2FgYENJEG2f3&tab=submissions&submissionId=10000068-26ed-9e2d-5149-f96716ca7264

/*
-- ПРИНЦИП РАБОТЫ --
Я реализовал удаление из бинарного дерева методом подстановки самой правой вершины левого поддерева удаляемой вершниы.
Для большей ясности оставил комментарии шагов в коде. При удалении вершины могут быть различные варианты:
1. Удаляемая вершины - это лист. Тогда можно просто удалить её из дерева.
2. У удаляемая вершины только 1 ребёнок - тогда можно просто отдать этого ребёнка родителю удаляемой вершины.
3. Более одного ребёнка - тут сложнее и подробнее ниже.
Для начала ищём самую правую вершины в левом поддереве удаляемой вершины. Её значение будет больше любой вершины в левом
поддереве и меньше любой в правом. Эту вершину нужно поставить вместо удаляемой. Если у правой вершины есть ребёнок, то он
только 1 и в левом поддереве - отдаём его родителю как правого ребёнка. Если же ребёнка нет, то правая вершина готова к замене.
Убираем правую вершину, вместо удаляемой ставим правую. Обновляем связь родителя удаляемой вершины и правой вершины. Передаём
детей удаляемой вершины к правой вершине.

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
По вариантам выше:
1. удаление листа не нарушает BST
2. если 1 ребёнок, то передача его родителю не нарушает BST
3. В левом поддереве самая правая вершина больше любой вершины в левом
поддереве и меньше любой в правом. Если разобрались с её ребёнком, то обмен правой вершины и удаляемой вершины не нарушит BST

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
В худшем случае, когда у удаляемой вершины есть и родитель и 2 дочерних вершины (h - высота дерева):
- поиск удаляемой вершины O(h)
- поиск правой вершины левого поддерева O(h)
- остальные операции принимаем за O(1).

Итого O(h)

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Не требует доп памяти кроме выделения под промежуточные указатели на вершины.
Итого O(1).

*/

if (process.env.REMOTE_JUDGE !== 'true') {
    class Node {
        constructor(value, left = null, right = null) {
            this.value = value;
            this.left = left;
            this.right = right;
        }
    }
}


function findMostRightNode(node, nodeParent) {
    if (node === null) {
        return [node, nodeParent];
    }

    let mostRightNode = node;
    let mostRightNodeParent = nodeParent;
    while (mostRightNode.right !== null) {
        mostRightNodeParent = mostRightNode;
        mostRightNode = mostRightNode.right;
    }
    return [mostRightNode, mostRightNodeParent];
}

function findNodeAndParent(node, key) {
    let current = node;
    let parent = null;

    while (current && current.value !== key) {
        parent = current;
        current = key < current.value ? current.left :current.right;
    }
    return current?.value === key ? [current, parent] : [null, null];
}

function remove(node, key) {
    // 1. Найти саму вершину, если она есть
    const [removingNode, removingParentNode] = findNodeAndParent(node, key);
    if (!removingNode) {
        return node;
    }

    // 2. Если удаляемая вершина это лист, то просто убрать связь с родителем. Если нет родителя - то это дерево из одной вершины.
    if (!removingNode.left && !removingNode.right) {
        if (removingParentNode) {
            removingParentNode[removingParentNode.left === removingNode ? 'left' : 'right'] = null;
            return node;
        } else {
            return null;
        }

    }

    // 3. Если у удаляемой вершины только 1 ребёнок, то вставить ребёнка вместо удаляемой вершины.
    let onlyOneChild = removingNode.left && !removingNode.right ? 'left' : !removingNode.left && removingNode.right ? 'right' : null;
    if (onlyOneChild) {
        if (removingParentNode) {
            removingParentNode[removingParentNode.left === removingNode ? 'left' : 'right'] = removingNode[onlyOneChild];
            return node;
        } else {
            return removingNode[onlyOneChild];
        }
    }

    // 4. Иначе всё сложнее. Найти самый правую вершину левого поддерева
    const [rightInLeftTree, rightInLeftTreeParent] = findMostRightNode(removingNode.left, removingNode);

    // 5. Определить, есть ли у rightInLeftTree левый ребёнок. Если есть, то передать родителю
    if (rightInLeftTree.left) {
        rightInLeftTreeParent.right = rightInLeftTree.left;
        rightInLeftTree.left = null;
    }

    // 6. Убрать связь rightInLeftTree с родителем rightInLeftTreeParent.
    rightInLeftTreeParent[rightInLeftTreeParent.left === rightInLeftTree ? 'left' : 'right'] = null;

    // 7. Понять, левым или правым ребёнком является removingNode у removingParentNode и заменить removingNode на rightInLeftTree.
    // Если нет родителя, то значит удаляемая вершины - это корень
    if (removingParentNode) {
        removingParentNode[removingParentNode.left === removingNode ? 'left' : 'right'] = rightInLeftTree;
    } else {
        node = rightInLeftTree;
    }

    // 8. Присвоить детей removingNode к rightInLeftTree
    rightInLeftTree.left = removingNode.left;
    rightInLeftTree.right = removingNode.right;

    return node;
}

function test() {
    var node1 = new Node(2, null, null);
    var node2 = new Node(3, node1, null);
    var node3 = new Node(1, null, node2);
    var node4 = new Node(6, null, null);
    var node5 = new Node(8, node4, null);
    var node6 = new Node(10, node5, null);
    var node7 = new Node(5, node3, node6);
    var newHead = remove(node7, 10);
    console.assert(newHead.value === 5);
    console.assert(newHead.right === node5);
    console.assert(newHead.right.value === 8);
}