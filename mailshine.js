var Regex = require('./lib/regex.js'),
	toMarkdown = require('to-markdown'),
	marked = require('marked');

function MailShine(options) {
	if (!options) return;

	if (options.addReplyDetectors) this.addMany(options.addReplyDetectors, 'replyDetector');
	if (options.addHTMLCleaners) this.addMany(options.addHTMLCleaners, 'htmlCleaner');
	if (options.removeReplyDetectors) this.removeMany(options.removeReplyDetectors, 'replyDetector');
	if (options.removeHTMLCleaners) this.removeMany(options.removeHTMLCleaners, 'htmlCleaner');
}

MailShine.prototype.parseHTML = function(html) {
	var output = {},
		cleanedHtml,
		convertedMarkdown,
		parsedMarkdown;

	if (!(html instanceof String)) {
		throw 'The email message to be parsed must be a HTML string.';
	}

	cleanedHtml = this.cleanHTML(html);
	convertedMarkdown = this.convertToMarkdown(cleanedHtml);
	parsedMarkdown = this.parseText(convertedMarkdown);

	output.markdownContent = parsedMarkdown.content;
	output.markdownQuote = parsedMarkdown.quote;
	output.htmlContent = marked(output.markdownContent);
	output.htmlQuote = marked(output.markdownQuote);

	return output;
};

MailShine.prototype.parseText = function(text) {
	var self = this;

	var nlRegex = /\r?\n/,
		parsedText = {},
		lineArray,
		cutPoint;

	lineArray = text.split(nlRegex);

	cutPoint = lineArray.findIndex(function(line) {
		return self.replyDetectors.some(function(regex) {
			return regex.test(line);
		});
	});

	parsedText.quote = lineArray.splice(cutPoint);
	parsedText.content = lineArray;

	parsedText.content = parsedText.content.join('\n').trim();
	parsedText.quote = parsedText.quote.join('\n').trim();

	return parsedText;
};

MailShine.prototype.add = function(regex, type) {
	var regexLibrary;

	if (!(regex instanceof RegExp)) {
		throw 'Must provide a Regex.';
	}

	regexLibrary = (type === 'replyDetector') ? this.regex.replyDetectors : this.regex.htmlCleaners;

	regexLibrary.push(regex);
};

MailShine.prototype.addMany = function(list, type) {
	var self = this;

	list.forEach(function(regex) {
		self.add(regex, type);
	});
};

MailShine.prototype.remove = function(regex, type) {
	var index,
		regexLibrary;

	if (!(regex instanceof RegExp)) {
		throw 'Must provide a Regex.';
	}

	regexLibrary = (type === 'replyDetector') ? this.regex.replyDetectors : this.regex.htmlCleaners;

	index = regexLibrary.findIndex(function(el) {
		return (el.toString() === regex.toString());
	});

	if (index > -1) regexLibrary.splice(index, 1);
};

MailShine.prototype.removeMany = function(list, type) {
	var self = this;

	list.forEach(function(regex) {
		this.remove(regex, type);
	});
};

MailShine.prototype.cleanHTML = function(html) {
	this.regex.htmlCleaners.forEach(function(regex) {
		html = html.replace(regex, '');
	});
	return html;
};

MailShine.prototype.convertToMarkdown = function(html) {
	return toMarkdown(html);
};

MailShine.prototype.convertToHTML = function(markdown) {
	return marked(markdown);
};

//Include methods and properties from separate files.
Regex(MailShine);

module.exports = MailShine;
