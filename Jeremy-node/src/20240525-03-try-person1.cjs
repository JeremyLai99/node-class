// CJS 匯入

const { Person1, PI: MY_CONST } = require("./20240525-02-person");
// 改名需用:

const p1 = new Person1("David", 29);

console.log(p1);
console.log(p1 + '');
console.log(MY_CONST);
