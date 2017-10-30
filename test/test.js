var MailShine = require('../mailshine.js'),
	fs = require('fs');


var mailshine = new MailShine();

var testHtml = fs.readFileSync('./test.html', 'utf8');
var output = mailshine.parseHTML(testHtml);
fs.writeFileSync('./test_content.txt', output.htmlContent, 'utf8');
fs.writeFileSync('./test_quote.txt', output.htmlQuote, 'utf8');
