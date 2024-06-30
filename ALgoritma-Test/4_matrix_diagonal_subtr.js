function diagonalSum(matrix) {
    let msg = ['diagonal pertama = ', 'diagonal kedua = '];
    
    const n = matrix.length;
    for (let row of matrix) {
        if (row.length !== n) {
            throw new Error('Input matrix must be a square matrix');
        }
    }

    let sum1 = 0;
    let sum2 = 0;

    for (let i = 0; i < n; i++) {
        sum1 += matrix[i][i];
        msg[0] += `${matrix[i][i]}`;

        sum2 += matrix[i][n - i - 1];
        msg[1] += `${matrix[i][n - i - 1]}`;

        if (i === n - 1) {
            msg[0] += ` = ${sum1}`;
            msg[1] += ` = ${sum2}`;
        } else {
            msg[0] += ' + ';
            msg[1] += ' + ';
        }
    }

    msg.push(`maka hasilnya adalah ${sum1} - ${sum2} = ${sum1 - sum2}`);
    return [sum1 - sum2, msg];
}

const inputMatrix = [
    [1, 2, 0],
    [4, 5, 6],
    [7, 8, 9]
];

console.log(`input square matrix: ${JSON.stringify(inputMatrix)}`);

const [result, message] = diagonalSum(inputMatrix);
console.log(`result diagonal subtraction: ${result}`);
console.log(`message: ${message.join(', ')}`);
