module.exports = function(MailShine) {
	/*
	 *Regex patterns to detect the quoted part of an email reply.
	 */
	MailShine.prototype.replyDetectors = [
		/--*?[\s]?[oO]riginal [mM]essage[\s]?-/g,
		/--*?[\s]?[fF]orwarded [mM]essage[\s]?-/g,
		/[tT]o:.*?[\s][fF]rom:.*?/g,
		/[fF]rom:.*?[\s][tT]o:.*?/g,
		/[oO]n .*?,.*?[wW]rote:/g,
		/>.*?[\s]>/g,
	];
};
