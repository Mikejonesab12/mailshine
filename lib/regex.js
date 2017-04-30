function Regex(){

}

/*
*Removes tag, but leaves the content between them.
*Tag reference: https://www.w3schools.com/TAgs/
*Yes, I know w3schools is terrible.
*/
Regex.prototype.htmlCleaners = [
    /<\/?!DOCTYPE.*?>/g,
    /<\/?a.*?>/g,
    /<\/?abbr.*?>/g,
    /<\/?acronym.*?>/g,
    /<\/?address.*?>/g,
    /<\/?applet.*?>/g,
    /<\/?area.*?>/g,
    /<\/?article.*?>/g,
    /<\/?aside.*?>/g,
    /<\/?audio.*?>/g,
    /<\/?b.*?>/g,
    /<\/?base.*?>/g,
    /<\/?basefont.*?>/g,
    /<\/?bdi.*?>/g,
    /<\/?bdo.*?>/g,
    /<\/?big.*?>/g,
    /<\/?body.*?>/g,
    /<\/?br.*?>/g,
    /<\/?button.*?>/g,
    /<\/?canvas.*?>/g,
    /<\/?caption.*?>/g,
    /<\/?center.*?>/g,
    /<\/?cite.*?>/g,
    /<\/?col.*?>/g,
    /<\/?colgroup.*?>/g,
    /<\/?datalist.*?>/g,
    /<\/?dd.*?>/g,
    /<\/?details.*?>/g,
    /<\/?dfn.*?>/g,
    /<\/?dialog.*?>/g,
    /<\/?dir.*?>/g,
    /<\/?div.*?>/g,
    /<\/?dl.*?>/g,
    /<\/?dt.*?>/g,
    /<\/?embed.*?>/g,
    /<\/?fieldset.*?>/g,
    /<\/?figcaption.*?>/g,
    /<\/?figure.*?>/g,
    /<\/?font.*?>/g,
    /<\/?footer.*?>/g,
    /<\/?form.*?>/g,
    /<\/?frame.*?>/g,
    /<\/?frameset.*?>/g,
    /<\/?head.*?>/g,
    /<\/?header.*?>/g,
    /<\/?html.*?>/g,
    /<\/?iframe.*?>/g,
    /<\/?input.*?>/g,
    /<\/?ins.*?>/g,
    /<\/?kbd.*?>/g,
    /<\/?keygen.*?>/g,
    /<\/?label.*?>/g,
    /<\/?legend.*?>/g,
    /<\/?link.*?>/g,
    /<\/?main.*?>/g,
    /<\/?map.*?>/g,
    /<\/?mark.*?>/g,
    /<\/?menu.*?>/g,
    /<\/?menuitem.*?>/g,
    /<\/?meta.*?>/g,
    /<\/?meter.*?>/g,
    /<\/?nav.*?>/g,
    /<\/?noframes.*?>/g,
    /<\/?noscript.*?>/g,
    /<\/?object.*?>/g,
    /<\/?optgroup.*?>/g,
    /<\/?option.*?>/g,
    /<\/?output.*?>/g,
    /<\/?param.*?>/g,
    /<\/?picture.*?>/g,
    /<\/?progress.*?>/g,
    /<\/?q.*?>/g,
    /<\/?rp.*?>/g,
    /<\/?rt.*?>/g,
    /<\/?ruby.*?>/g,
    /<\/?s.*?>/g,
    /<\/?samp.*?>/g,
    /<\/?section.*?>/g,
    /<\/?select.*?>/g,
    /<\/?small.*?>/g,
    /<\/?source.*?>/g,
    /<\/?span.*?>/g,
    /<\/?sub.*?>/g,
    /<\/?summary.*?>/g,
    /<\/?sup.*?>/g,
    /<\/?textarea.*?>/g,
    /<\/?time.*?>/g,
    /<\/?title.*?>/g,
    /<\/?track.*?>/g,
    /<\/?tt.*?>/g,
    /<\/?var.*?>/g,
    /<\/?video.*?>/g,
    /<\/?wbr.*?>/g,
    /<script.*?>[\s\S]*?<\/script>/g, //Removes the entire script block
    /<style.*?>[\s\S]*?<\/style>/g, //Removes the entire style block
    /<head.*?>[\s\S]*?<\/head>/g, //Removes the entire head block
    /<!--[\s\S]*?-->/g, //Removes all comment blocks
    /\s?class.*?=.*?".*?"/g, //Removes all class attributes
    /\s?data-.*?=.*?".*?"/g //Removes all data-attributes
];

Regex.prototype.replyDetectors = [
	/--*\s?original message\s?-*-|--*\s?Original Message\s?-*-/g,
    /To:.*[\s]?From:.*|From:.*[\s]?To:.*/g,
    /On (Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (January|February|March|April|May|June|July|August|September|October|November|December) [0-9]*, [0-9]* [0-9]:[0-9]* [A-Z]*, .* wrote:/g, //Yahoo Mail Online
    /On (Sun|Mon|Tues|Wed|Thurs|Fri|Sat|Sun), (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sept|Oct|Nov|Dec) [0-9]*, [0-9]* at [0-9]:[0-9]* [A-Z]*, .* wrote:/g, //Gmail Online
    />.*[\s]>/g, //All clients that quote with the ">"" character. Needs two consective lines that begin with ">"
    /On (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sept|Oct|Nov|Dec) [0-9]*, [0-9]*, at [0-9]:[0-9]* [A-Z]*, .* wrote:/g
];

module.exports = Regex;
