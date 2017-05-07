var Regex = require('./lib/regex.js'),
	fs = require('fs'),
	Remarked = require('remarked.js'),
	marked = require('marked');

function MailShine(options) {
	if (!options) return;
	if (options.add) this.addMany(options.add);
	if (options.remove) this.removeMany(options.remove);
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

	parsedText.quote = (cutPoint === -1) ?  [] : lineArray.splice(cutPoint);
	parsedText.content = lineArray;

	parsedText.content = parsedText.content.join('\n').trim();
	parsedText.quote = parsedText.quote.join('\n').trim();

	return parsedText;
};

MailShine.prototype.add = function(regex) {
	if (!(regex instanceof RegExp)) {
		throw 'Must provide a Regex.';
	}

	this.replyDetectors.push(regex);
};

MailShine.prototype.addMany = function(list, type) {
	var self = this;

	list.forEach(function(regex) {
		self.add(regex);
	});
};

MailShine.prototype.remove = function(regex, type) {
	var index;

	if (!(regex instanceof RegExp)) {
		throw 'Must provide a Regex.';
	}

	index = this.replyDetectors.findIndex(function(el) {
		return (el.toString() === regex.toString());
	});

	if (index > -1) this.replyDetectors.splice(index, 1);
};

MailShine.prototype.removeMany = function(list) {
	var self = this;

	list.forEach(function(regex) {
		self.remove(regex);
	});
};

//Include methods and properties from separate files.
Regex(MailShine);

module.exports = MailShine;
