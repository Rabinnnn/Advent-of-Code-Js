import fs from 'fs';

fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }

    const regex = /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g;
    let sum = 0;
    let flag = true; // At the start, `mul` instructions are enabled.

    // Use matchAll to find all valid matches
    const matches = data.matchAll(regex);

    for (const match of matches) {
        if (match[0] === 'do()') {
            flag = true; // Enable mul processing
        } else if (match[0] === "don't()") {
            flag = false; // Disable mul processing
        } else if (match[0].startsWith('mul') && flag) {
            // Extract numbers X and Y from mul(X, Y)
            const x = parseInt(match[1]);
            const y = parseInt(match[2]);
            sum += x * y; // Compute and add the product
        }
    }

    console.log("Sum of enabled multiplications:", sum);
});
