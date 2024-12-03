const fs = require('fs');

fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err){
        console.error('Error reading file:', err)
        return
    }
    var report = []
    const reports = data.split('\n').map(line => {
        report  = line.split(' ').map(Number)
        console.log('report:', report)
    })

    console.log('Reports:',reports)

} )