function siftDown(heap, idx) {
    // Your code
    // “ヽ(´▽｀)ノ”
    let left = idx * 2;
    let right = idx * 2 + 1;

    if (left >= heap.length) {
        return idx;
    }

    let largestIdx;
    if (right < heap.length) {
        if (heap[right] < heap[idx] && heap[left] < heap[idx]) {
            return idx;
        }
        largestIdx = heap[left] < heap[right] ? right : left;
    } else {
        if (heap[left] < heap[idx]) {
            return idx;
        }
        largestIdx = left;
    }

    [heap[largestIdx], heap[idx]] = [heap[idx], heap[largestIdx]];

    return siftDown(heap, largestIdx);
}

function test() {
    var sample = [-1, 12, 1, 8, 3, 4, 7];
    console.assert(siftDown(sample, 2) == 5);
}