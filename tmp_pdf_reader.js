import fs from 'fs';
import pdf from 'pdf-parse';

let dataBuffer = fs.readFileSync('C:/Users/Ayush Porwal/Downloads/Tailoring_Platform_Flow_Document (1) (2).pdf');

pdf(dataBuffer).then(function(data) {
    console.log(data.text);
}).catch(err => {
    console.error(err);
});
