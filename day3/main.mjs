import fs from 'fs';

fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }

    const regex = /mul\((\d{1,3}),(\d{1,3})\)|don?'t?\(\s?\)/g;
    const regexMul = /mul\((\d{1,3}),(\d{1,3})\)/;  // Pattern to match mul(X, Y)
    const regexDo = /do\(\)/;  // Pattern to match do()
    const regexDont = /don't\(\)/;  // Pattern to match don't()

    let sum = 0;
    let flag = true;  // Initially, mul instructions are enabled

    // Use matchAll to find all matches in the whole string
    const matches = data.matchAll(regex);

    for (const match of matches) {
        // match[0] contains the entire matched string
        if (regexDo.test(match[0])) {
            flag = true;  // Enable future mul(X, Y) instructions
        } else if (regexDont.test(match[0])) {
            flag = false;  // Disable future mul(X, Y) instructions
        } else if (regexMul.test(match[0]) && flag) {
            // Process mul(X, Y) if flag is true (enabled)
            const matchResult = match[0].match(regexMul);
            if (matchResult) {
                const x = matchResult[1];  // Captured first number (X)
                const y = matchResult[2];  // Captured second number (Y)
                const product = parseInt(x) * parseInt(y);  // Compute the product
                sum += product;
            }
        }
    }

    console.log("Sum of products:", sum);
});
