const fs = require('fs')

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
        if (dampener(report)) {
            safeCount++;
        }
    });

    console.log('safe reports:', safeCount);
});

// Check if the levels are either increasing or decreasing, and the difference between adjacent levels is between 1 and 3.
function isSafe(report) {
    let isIncreasing = report[1] > report[0]; // Determine if the first step is increasing

    for (let i = 0; i < report.length - 1; i++) {
        // Check if the difference between adjacent levels is valid
        if (Math.abs(report[i + 1] - report[i]) < 1 || Math.abs(report[i + 1] - report[i]) > 3) {
            return false;
        }

        // Check if the sequence is consistently increasing or decreasing
        if ((report[i + 1] > report[i]) !== isIncreasing) {
            return false;
        }
    }
    return true;
}

function dampener(report) {
    // First, check if the report is already safe
    if (isSafe(report)) {
        return true;
    }

    // Try removing one element and check if the report becomes safe
    for (let i = 0; i < report.length; i++) {
        // Create a modified report by removing the i-th element
        const modifiedReport = report.slice(0, i).concat(report.slice(i + 1));

        // Check if the modified report is safe
        if (isSafe(modifiedReport)) {
            return true;
        }
    }

    return false;
}