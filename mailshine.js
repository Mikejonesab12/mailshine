var Regex = require('./lib/regex.js'),
	fs = require('fs'),
	Remarked = require('remarked.js'),
	marked = require('marked');

function MailShine(options) {
	if (!options) return;
	if (options.addReplyDetectors) this.addMany(options.addReplyDetectors, 'replyDetector');
	if (options.removeReplyDetectors) this.removeMany(options.removeReplyDetectors, 'replyDetector');
}

MailShine.prototype.parseHTML = function(html) {
	var output = {},
		convertedMarkdown,
		parsedMarkdown;

	if (typeof html !== 'string') {
		throw 'The email message to be parsed must be a HTML string.';
	}

	convertedMarkdown = new Remarked(html).markdown;
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

	cutPoint = lineArray.findIndex(function(line, index) {
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

//Include methods and properties from separate files.
Regex(MailShine);

module.exports = MailShine;
