var readline = require('readline');
var ioInterface = readline.createInterface({input: process.stdin});

let outputNumbers = [],
    lineNumber = 0,
    numLines;
ioInterface.on('line', function (line) {
    if (lineNumber === 0) {
        numLines = parseInt(line);
    } else if (lineNumber <= numLines) {
        let values = line.split(" ");
        let valueOne = parseInt(values[0]),
            valueTwo = parseInt(values[1]);
        let result = valueOne + valueTwo;
        outputNumbers.push(result);
    }
    lineNumber++;
})

ioInterface.on('close', function () {
    if (lineNumber < 1 + numLines) {
        // последняя строка была пустой и потому не считана
        // здесь мы могли бы обработать эту ситуацию
    }
    process.stdout.write(outputNumbers.join('\n'));
})