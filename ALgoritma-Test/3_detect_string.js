function detectStrings(inputArr, queryArr) {
    let output = [];
    let msg = [];
    
    for (let q of queryArr) {
        let count = inputArr.filter(string => string === q).length;

        if (count === 0) {
            msg.push(`kata ${q} tidak ada pada INPUT`);
        } else {
            msg.push(`kata ${q} terdapat ${count} pada INPUT`);
        }

        output.push(count);
    }

    return [output, msg];
}

const input = ['xc', 'dz', 'bbb', 'dz'];
console.log(`INPUT: ${input}`);

const query = ['bbb', 'ac', 'dz'];
console.log(`QUERY: ${query}`);

const [output, message] = detectStrings(input, query);
console.log(`result: ${output}`);
console.log(`message: ${message.join(', ')}`);
