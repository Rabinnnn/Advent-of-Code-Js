import fs from 'fs';

fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }

    const regex = /mul\((\d{1,3}),(\d{1,3})\)/g; // Global match for mul(X, Y)
    let sum = 0;

    // Use matchAll to find all matches in the whole string
    const matches = data.matchAll(regex);

    for (const match of matches) {
        const [_, x, y] = match; 
        const product = parseInt(x) * parseInt(y);
        sum += product;
    }

    console.log("Sum of products:", sum);
});
