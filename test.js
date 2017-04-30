var MailShine = require('./mailshine.js'),
    mailshine,
    output,
    testHtml,
    testText;

    testHtml = '<p class = "test">cool content</p>\
    <h1>test title</h1>\
    <p>More content.</p>\
    <blockquote>---original message---\
    <p>this is a quote.</p></blockquote>';

    mailshine = new MailShine();

    output = mailshine.parseHTML(testHtml);

    console.log(output);
