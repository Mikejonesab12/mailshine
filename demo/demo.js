const fs = require('fs');
const path = require('path');
const MailShine = require('../mailshine.js');

var testHtml = fs.readFileSync(path.join(__dirname, './test.html'), 'utf8');
var output = MailShine(testHtml);

fs.writeFileSync(path.join(__dirname, './demo_content.txt'), output.htmlContent, 'utf8');
fs.writeFileSync(path.join(__dirname, './test_quote.txt'), output.htmlQuote, 'utf8');
