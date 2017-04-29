var Regex = require('./lib/regex.js');

module.exports.clean = function (html){
    if(!(html instanceof String)){
        throw 'The email message to be parsed must be a HTML string.';
    }
};

module.exports.addReplyDetector = function(regex){
    if(!(regex instanceof RegExp)){
        throw 'A reply detector must be a regex.';
    }
    Regex.replyDetectors.push(regex);
};
