// https://contest.yandex.ru/contest/59541/problems/

const { createInterface } = require("readline");


/*let test = [
    '2',
'2',
'Love Life',
'2',
'Life GoodDay',
]*/

function solveTestCase(test){
    let res = [];
    const n = test[0];
    const allSongs = {};

    test.slice(1).forEach((item, i) => {
        if (i%2 !==0) {
            let songs = item.split(' ');

            songs.forEach((song) => {

                if (song in allSongs) {
                    allSongs[song] = allSongs[song]+1;
                } else {
                    allSongs[song] = 1;
                }
            })
        }
    });


    Object.entries(allSongs).forEach(([song, count]) => {
        if (count === Number(n)) {
            res.push(song);
        }
    });

    console.log(res.length);
    console.log(res.sort().join(' '));

}

//solveTestCase(test);




const lines = [];
createInterface({
    input: process.stdin,
    output: process.stdout,
}).on("line", (line) => {
    lines.push(line.toString().trim());
}).on("close", () => {
    solveTestCase(lines);
});

