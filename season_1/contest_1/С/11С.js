
// https://contest.yandex.ru/contest/27393/problems/C
const {createInterface} = require("readline");
const lines = [];

function normalizePhoneNumber(phoneNumber) {
    // nodejs 14 не поддерживает replaceAll
    const normalizedPhoneNumber = phoneNumber
        .split('+7').join('8')
        .split('-').join('')
        .split('(').join('')
        .split(')').join('');
    const hasCode = normalizedPhoneNumber.length > 7;
    const code = hasCode ? normalizedPhoneNumber.slice(1, 4): '495';
    const tailNumber = hasCode ? normalizedPhoneNumber.slice(4): normalizedPhoneNumber;
    return `${8}${code}${tailNumber}`;
}

function solveTestCase(test) {
    const [candidatePhone, bookPhone1, bookPhone2, bookPhone3] = test.map(normalizePhoneNumber);
    [bookPhone1, bookPhone2, bookPhone3].forEach((phone) => {
        if (phone === candidatePhone) {
            console.log('YES');
        } else {
            console.log('NO');
        }
    })
}


createInterface({
    input: process.stdin,
    output: process.stdout,
}).on("line", (line) => {
    lines.push(line.toString().trim());
}).on("close", () => {
    solveTestCase(lines);
});
