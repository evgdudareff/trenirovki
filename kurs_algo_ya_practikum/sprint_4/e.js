
function solve(s, a, m) {
    if (!s) {
        process.stdout.write(`0`);
        return;
    }

    let ans = 0;
    let prev = 0;
    for (let i = 0; i < s.length - 1; i++) {
        prev = ((s[i].charCodeAt(0) + prev) * a) % m;
    }
    prev +=  s[s.length - 1].charCodeAt(0);
    ans = prev % m;

    return ans;
}

const lowercaseAlphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));
function getRandomLetter() {
    const randomIndex = Math.floor(Math.random() * lowercaseAlphabet.length);
    return lowercaseAlphabet[randomIndex];
}



function test(){
    const a = 1000;
    const m = 123987123;
    let s1 = '';
    let s2 = '';
    let char1, char2;
    let hashS1, hashS2;

    while (hashS1 === undefined || (hashS1 !== hashS2 && s1.length !== 20)) {
        char1 = getRandomLetter();

        while (true) {
            char2 = getRandomLetter();
            if (char2 !== char1) {
                break
            }
        }

        s1 += char1;
        s2 += char2;

        hashS1 = solve(s1, a, m);
        hashS2 = solve(s2, a, m);

    }

    if (hashS1 === hashS2) {
        console.log(s1)
        console.log('\n')
        console.log(s2)
    } else {
        hashS1 = hashS2 = undefined;
        s1 = s2 = '';
        test();
    }
}

function test2(){
    let s1 = 'ezhgeljkablzwnvuwqvp';
    let s2 = 'gbpdcvkumyfxillgnqrv';
    const a = 1000;
    const m = 123987123;

    let currHash = 0;
    let currStr = '';
    for (let i = 0; i < s1.length; i++) {
        currStr += s1[i];
        currHash = solve(currStr, a, m);
        console.log(`For str = ${currStr} hash is ${currHash}`);
    }
    console.log(`final str is ${currStr} ans hash is ${currHash}`);

    console.log('------------------------------------');

    currHash = 0;
    currStr = '';
    for (let i = 0; i < s2.length; i++) {
        currStr += s2[i];
        currHash = solve(currStr, a, m);
        console.log(`For str = ${currStr} hash is ${currHash}`);
    }
    console.log(`final str is ${currStr} ans hash is ${currHash}`);
}

let chars = {};

function test3(){
    const a = 1000;
    const m = 123987123;

    let str1 = 'e';
    let str2 = 'g';
    let k = 0;

    while (k < 40) {

        let minDiff = Number.MAX_SAFE_INTEGER;
        let bestChar1 = '';
        let bestChar2 = '';
        for (let i = 0; i < lowercaseAlphabet.length; i++) {

            let s1Hash = solve(`${str1}${lowercaseAlphabet[i]}`, a, m);
            for (let j = 0; j < lowercaseAlphabet.length; j++) {

                let s2Hash = solve(`${str2}${lowercaseAlphabet[j]}`, a, m);
                let diff = s2Hash - s1Hash;
                if (diff === 0) {
                    bestChar1 = lowercaseAlphabet[i];
                    bestChar2 = lowercaseAlphabet[j];
                    console.log(`i=${i}, ${bestChar1}`);
                    console.log(`j=${j}, ${bestChar2}`);
                    break;
                }
                if (diff < minDiff) {
                    minDiff = diff;
                    bestChar1 = lowercaseAlphabet[i];
                    bestChar2 = lowercaseAlphabet[j];
                }
            }
        }

        str1 += bestChar1;
        str2 += bestChar2;
        chars = {};
        k++;
    }

    console.log(str1);
    console.log(str2);
    console.log('again')

}
// ezhgeljkablzwnvuwqvp
// gbpdcvkumyfxillgnqrv

// ezyabxcdwvutsfrghqpoijnkml
// gabzycxwdefhivjutklmsrnqop

// test2();

// console.log(solve('e', 1000, 123987123));
// console.log(solve('g', 1000, 123987123));

function test4(){
    const a = 1000;
    const m = 123987123;

    let str1 = 'e';
    let str2 = 'g';
    let k = 0;

    while (k < 40) {

        let minDiff = Number.MAX_SAFE_INTEGER;
        let bestChar1 = '';
        let bestChar2 = '';
        for (let i = 0; i < lowercaseAlphabet.length; i++) {

            let s1Hash = solve(`${lowercaseAlphabet[i]}${str1}`, a, m);
            for (let j = 0; j < lowercaseAlphabet.length; j++) {

                let s2Hash = solve(`${str2}${lowercaseAlphabet[j]}`, a, m);
                let diff = Math.abs(s2Hash - s1Hash);
                if (diff === 0 && `${lowercaseAlphabet[i]}${str1}` !== `${str2}${lowercaseAlphabet[j]}`) {
                    console.log(`i=${i}, ${str1}`);
                    console.log(`j=${j}, ${str2}`);
                    throw new Error('stop');
                }
                if (diff < minDiff) {
                    minDiff = diff;
                    bestChar1 = lowercaseAlphabet[i];
                    bestChar2 = lowercaseAlphabet[j];
                }
            }
        }

        str1 += bestChar1;
        str2 += bestChar2;
        chars = {};
        k++;
    }

    console.log(str1);
    console.log(str2);
    console.log('again')

}

test2();