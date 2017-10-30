module.exports = [
	/^--*?[\s]?[oO]riginal [mM]essage[\s]?-/g,
	/^--*?[\s]?[fF]orwarded [mM]essage[\s]?-/g,
	/^[tT]o:.*?[\s][fF]rom:/g,
	/^[fF]rom:.*?[\s][tT]o:/g,
	/^[oO]n .*?,.*?[wW]rote:/g,
	/^\\>.*?[\s]\\>/g
];
