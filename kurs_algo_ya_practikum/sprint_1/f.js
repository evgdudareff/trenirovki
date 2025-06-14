const readline = require('readline');

const ioInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});



let text;
const charDictionary = {};

// Добавляем маленькие буквы
"abcdefghijklmnopqrstuvwxyz".split("").forEach(char => {
    charDictionary[char] = char;
});

// Добавляем заглавные буквы
"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(char => {
    charDictionary[char] = char;
});

// Добавляем цифры
"0123456789".split("").forEach(char => {
    charDictionary[char] = char;
});


ioInterface.on('line', line => {
    text = line;
});

ioInterface.on('close', solve)

function solve() {
    let finalText = '';

    for (let i =0; i < text.length; i++) {
        const currChar = text[i];
        if (charDictionary[currChar]){
            finalText += currChar.toLowerCase();
        }
    }
    const anwser = finalText === finalText.split('').reverse().join('') ? 'True' : 'False';
    process.stdout.write(anwser);

}