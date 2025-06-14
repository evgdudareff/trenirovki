function siftUp(heap, idx) {
    // Your code
    // “ヽ(´▽｀)ノ”
    if (idx === 1) {
        return idx;
    }


    let parent = Math.floor(idx / 2);
    if (heap[parent] > heap[idx]) {
        return idx;
    }

    let temp = heap[parent];
    heap[parent] = heap[idx];
    heap[idx] = temp;

    idx = parent;
    return siftUp(heap, idx);
}

function test() {
    var sample = [-1, 12, 6, 8, 3, 4, 7];
    console.assert(siftUp(sample, 5) == 11);
}

test();