const patterns = require('./lib/patterns.js');
const Unmark = require('unmark');
const marked = require('marked');

const removePatterns = (currentPatterns, newPatterns) => {
    newPatterns.forEach(newPattern => {
        const index = currentPatterns.findIndex(pattern => (pattern.toString() === newPattern.toString()));
        if (index > -1) currentPatterns.splice(index, 1);
    });
	
    return currentPatterns;
}

const addPatterns = (currentPatterns, newPatterns) => [...currentPatterns, ...newPatterns];

const MailShine = (htmlString, options) => {
    let updatedPatterns;
	
    if (options.adds) {
        updatedPatterns = addPatterns(patterns, options.adds)
    }
	
    if (options.remove) {
        updatedPatterns = removePatterns(options.remove);
    }
	
    return parseHTML(htmlString, updatedPatterns);
}

const parseHTML = function(html, patterns) {
    const convertedMarkdown = Unmark(html);
    const parsedMarkdown = parseMarkdown(convertedMarkdown, patterns);
	
    return {
        markdownContent: parsedMarkdown.content,
        markdownQuote: parsedMarkdown.quote,
        htmlContent: marked(parsedMarkdown.content),
        htmlQuote: marked(parsedMarkdown.quote)
    };
};

const parseMarkdown = (text, patterns) => {
    const lineArray = text.split(/\r?\n/);

    const cutPoint = lineArray.findIndex((line, index) => {
        const testText = lineArray.slice(index).join('\n').trim(); // We want all the text starting at this line.
        return patterns.some((pattern) => pattern.test(testText));
    });

    var parsedText = {};
	
    parsedText.quote = ((cutPoint === -1) ?  [] : lineArray.splice(cutPoint)).join('\n').trim();
    parsedText.content = lineArray.join('\n').trim();

    return parsedText;
};

module.exports = MailShine;
