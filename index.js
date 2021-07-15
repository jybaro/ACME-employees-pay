const solution = require('./js/solution');
const fs = require('fs');

let watching = false;
const watchedFolder = './drophere';

console.log('Please move or paste your file into "' + watchedFolder + '" folder...');

fs.watch(watchedFolder, (eventType, filename) => {
    if(watching) return;
    watching = true;


    if ('change,rename'.split(',').includes(eventType) ) {
        console.log('File "' + filename + '" detected, reading...');

        fs.readFile('./drophere/' + filename, 'utf8' , (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            const lines = data.toString().replace(/\r\n/g,'\n').split('\n');

            if (lines.length < 5) {
                console.error('ERROR: The file must contain at least five sets of data.');
            } else {
                lines.forEach((line, index) => {
                    const result = solution.getAmountByText(line);
                    let msg = '';
        
                    if (result.error) {
                        msg = 'ERROR: The dataset in line ' + (index + 1) + ' has format error(s)!';
                        console.error(msg);
                    } else {
                        msg = (index + 1) + `. The amount to pay ${ result.name } is: ${ result.amount } USD`;
                        console.log(msg); 
                    }
                });
            }
        })
    }

    setTimeout(() => {
        watching = false;
    }, 100);
});