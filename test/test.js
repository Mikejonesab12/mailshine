var MailShine = require('../mailshine.js'),
    mailshine,
	fs = require('fs'),
    output,
    testHtml,
    testText;


    mailshine = new MailShine();
    testHtml = fs.readFileSync('./test.html','utf8');
    output = mailshine.parseHTML(testHtml);

    console.log(output);
