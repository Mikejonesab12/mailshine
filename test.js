var MailShine = require('./mailshine.js'),
    mailshine,
    output,
    testHtml,
    testText;

    testHtml = "<p>cool content</p>\
    <p>More content.</p>\
    <blockquote>---original message---\
    <p>this is a quote.</p></blockquote>";

    mailshine = new MailShine();

    output = mailshine.parseHTML(testHtml);

    console.log(output);
