function findLongestWord(sentence) {
    const words = sentence.split(' ');
    let longestWord = '';

    for (let word of words) {
        if (word.length > longestWord.length) {
            longestWord = word;
        }
    }

    console.log(`Kata terpanjang adalah '${longestWord}' dengan ${longestWord.length} karakter`);
}

const sentence = "Algoritma sangat menyenangkan jika sudah dipahami";

console.log(`input: ${sentence}`);
findLongestWord(sentence);
