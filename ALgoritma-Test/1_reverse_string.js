function reverseAlphaChars(inputString) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
    let chars = inputString.split('');
    let alphaIndices = [];
    let alphaChars = [];

    for (let i = 0; i < chars.length; i++) {
        if (alphabet.includes(chars[i])) {
            alphaIndices.push(i);
            alphaChars.push(chars[i]);
        }
    }

    alphaChars.reverse();

    for (let i = 0; i < alphaIndices.length; i++) {
        chars[alphaIndices[i]] = alphaChars[i];
    }

    return chars.join('');
}

let inputString = "NEGIE1";
console.log('input: ' + inputString);

let outputString = reverseAlphaChars(inputString);
console.log('output: ' + outputString); // EIGEN1

inputString = "idayraK1";
console.log('input: ' + inputString);

outputString = reverseAlphaChars(inputString);
console.log('output: ' + outputString); // Karyadi1
