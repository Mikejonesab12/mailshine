var Regex = require('./lib/regex.js'),
	toMarkdown = require('to-markdown'),
	marked = require('marked');

module.exports.clean = function(html) {
	var output = {
		html: '',
		md:'',
		reply:{
			html:'',
			md: ''
		}
	};

	if (!(html instanceof String)) {
		throw 'The email message to be parsed must be a HTML string.';
	}

	return output;
};

module.exports.addReplyDetector = function(regex) {
	if (!(regex instanceof RegExp)) {
		throw 'A reply detector must be a regex.';
	}
	Regex.replyDetectors.push(regex);
};

module.exports.addHTMLCleaner = function (){

};

function cleanHTML(html) {
	Regex.htmlCleaners.forEach(function(regex) {
		html = html.replace(regex, '');
	});
	return html;
}

function convertToMarkdown (html){
	return toMarkdown(html);
}

function convertToHTML (markdown){
	return marked(markdown);
}
