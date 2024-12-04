const fs = require('fs');

// Read the data from the file
fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    let safeCount = 0;

    // Process each report
    const reports = data.trim().split('\n').map(line => line.split(' ').map(Number));

    reports.forEach(report => {
        if (isSafe(report)) {
            safeCount++;
        }
    });

    console.log('safe reports:', safeCount);
});

// Function to check if a report is safe
function isSafe(report) {
  

    let isIncreasing = report[1] > report[0]; // Determine the direction of the first step

    for (let i = 0; i < report.length - 1; i++) {
        const diff = Math.abs(report[i + 1] - report[i]);

        // Check if the difference is within the allowed range
        if (diff < 1 || diff > 3) {
            return false;
        }

        // Check if all levels are consistently increasing or decreasing
        if ((report[i + 1] > report[i]) !== isIncreasing) {
            return false;
        }
    }

    return true; // All checks passed
}
