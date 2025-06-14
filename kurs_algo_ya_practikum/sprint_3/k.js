
function merge_sort(arr, left, right) {
    if (left >= right - 1) {
        return;
    }

    const mid = Math.floor((left + right)/2);

    merge_sort(arr, left, mid);
    merge_sort(arr, mid, right);
    const mergedArr = merge(arr, left, mid, right);

    for (let j = left, i = 0; j < right; i++, j++) {
        arr[j] = mergedArr[i];
    }

}

function merge(arr, left, mid, right) {
    const leftArr = arr.slice(left, mid);
    const rightArr = arr.slice(mid, right);
    const resultArr = [];

    let i = 0;
    let j = 0;
    let k = 0;


    while (i < leftArr.length && j < rightArr.length) {
        if (leftArr[i] <= rightArr[j]) {
            resultArr[k] = leftArr[i];
            i++;
        } else {
            resultArr[k] = rightArr[j];
            j++;
        }
        k++;
    }

    while (i < leftArr.length) {
        resultArr[k] = leftArr[i];
        i++;
        k++;
    }

    while (j < rightArr.length) {
        resultArr[k] = rightArr[j];
        j++;
        k++;
    }
    arr = resultArr;
    return arr;

}

function test() {
    // var a = [1, 4, 9, 2, 10, 11];
    // var b = merge(a, 0, 3, 6);
    // var expected = [1, 2, 4, 9, 10, 11];

    var c = [1];
    merge_sort(c, 0, 1)
    expected = [1, 1, 2, 2, 4, 10];
}

test();