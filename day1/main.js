const fs = require('fs');

// Read the file and split lines into pairs
fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    // Parse the data into left and right lists
    const pairs = data.split('\n').filter(line => line.trim() !== '').map(line => {
        const [left, right] = line.split(/\s+/).map(Number);
        return { left, right };
    });

    // Extract left and right lists
    const leftList = pairs.map(pair => pair.left);
    const rightList = pairs.map(pair => pair.right);

    // Sort both lists
    leftList.sort((a, b) => a - b);
    rightList.sort((a, b) => a - b);

    // Calculate the total distance
    let totalDistance = 0;
    for (let i = 0; i < leftList.length; i++) {
        totalDistance += Math.abs(leftList[i] - rightList[i]);
    }

    console.log('Total Distance:', totalDistance);

    var sum = 0
    var count = 0
    var similarity = 0
    for (let i = 0; i < leftList.length; i++){
        for (let j = 0; j < rightList.length; j++){
            if (leftList[i] === rightList[j]){
                count++
            }
        }
        similarity = count * leftList[i]
        sum += similarity
        count = 0
        similarity = 0
    }
    console.log('Similarity Score:', sum)
});
