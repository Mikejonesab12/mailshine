var Regex = require('./lib/regex.js'),
	toMarkdown = require('to-markdown'),
	marked = require('marked');

function MailShine() {
	this.regex = Regex.prototype;
}

MailShine.prototype.clean = function(html) {
	var output = {
		html: '',
		md: '',
		reply: {
			html: '',
			md: ''
		}
	};

	if (!(html instanceof String)) {
		throw 'The email message to be parsed must be a HTML string.';
	}

	output.html = this.cleanHTML(html);

	return output;
};

MailShine.prototype.add = function(regex, type) {
	var regexLibrary;

	if (!(regex instanceof RegExp)) {
		throw 'Must provide a Regex.';
	}

	regexLibrary = (type === 'replyDetector') ? this.regex.replyDetectors : this.regex.htmlCleaners;

	regexLibrary.push(regex);
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

module.exports = MailShine;
