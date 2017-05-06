var MailShine = require('../mailshine.js'),
	mailshine,
	fs = require('fs'),
	output,
	testHtml,
	testText;


mailshine = new MailShine();
testHtml = fs.readFileSync('./test.html', 'utf8');
output = mailshine.parseHTML(testHtml);
fs.writeFileSync('./test_content.txt', output.htmlContent, 'utf8');
fs.writeFileSync('./test_quote.txt', output.htmlQuote, 'utf8');
