var patterns = require('./lib/regex.js'),
	fs = require('fs'),
	Unmark = require('unmark'),
	marked = require('marked');

function MailShine(options) {
	if (!options) return;
	if (options.add) this.addMany(options.add);
	if (options.remove) this.removeMany(options.remove);
}

MailShine.prototype.parseHTML = function(html) {

	if (typeof html !== 'string') {
		throw 'The email message to be parsed must be a HTML string.';
	}

	var convertedMarkdown = new Unmark(html).markdown;
	console.log(convertedMarkdown);
	var parsedMarkdown = this.parseText(convertedMarkdown);

	var output = {};

	output.markdownContent = parsedMarkdown.content;
	output.markdownQuote = parsedMarkdown.quote;
	output.htmlContent = marked(output.markdownContent);
	output.htmlQuote = marked(output.markdownQuote);

	return output;
};

MailShine.prototype.parseText = function(text) {
	var self = this;

	var lineArray = text.split(/\r?\n/);

	var cutPoint = lineArray.findIndex(function(line, index) {
		var testText = lineArray.slice(index).join('\n').trim();
		return self.replyDetectors.some(function(regex) {
			return regex.test(testText);
		});
	});

	var parsedText = {};
	console.log(cutPoint);
	parsedText.quote = ((cutPoint === -1) ?  [] : lineArray.splice(cutPoint)).join('\n').trim();
	parsedText.content = lineArray.join('\n').trim();

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
	if (!(regex instanceof RegExp)) {
		throw 'Must provide a Regex.';
	}

	var index = this.replyDetectors.findIndex(function(el) {
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

MailShine.prototype.replyDetectors = patterns;

module.exports = MailShine;
