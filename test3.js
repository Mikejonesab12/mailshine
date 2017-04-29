var test1 = require('./test1.js');
var test2 = require('./test2.js');



var ins = new test2();
ins.changeProp();
console.log(new test1().props.var1);
console.log(ins.props.var1);
