var test1 = require('./test1.js');

function testClass (){
    this.props = test1.prototype;
}

testClass.prototype.changeProp = function (){
    this.props.var1 = 'clowns';
};

module.exports = testClass;
