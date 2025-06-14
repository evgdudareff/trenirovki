
let error = 0;

const customFetch = () => {
    return Promise.reject(`error ${error++}`);
}

async function retryFetch(url, {retryCount}) {
    try {
        const res = await customFetch();
    } catch (e) {
        if (retryCount > 0) {
            return retryFetch(url,  {retryCount: retryCount - 1});
        }
        throw e;
    }
}

async function retryFetch1(url, {retryCount}) {
    try {
        const res = await customFetch();
    } catch (e) {
        if (retryCount > 0) {
            setTimeout((retryCount) => {
                retryFetch(url,  {retryCount: retryCount - 1});
            }, 0, retryCount - 1)
        } else {
            throw e;
        }

    }
}

async function retryFetch2(url, {retryCount}) {
    while (retryCount > 0) {
        try {
            const res = await customFetch();
            return res;
        } catch (e) {
            retryCount--;
            if (retryCount === 0) {
                throw e;
            }
        }
    }

}

function solve() {
    const res = retryFetch2('http://localhost', {retryCount: 3}).then(() => {
        console.log('never')
    }).catch((e) => {
        console.log(e);
    })
}

solve();