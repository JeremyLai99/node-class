class Person1 {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  toString() {
    return JSON.stringify(this);
  }
}

const PI = 3.14;

// CJS 單一匯出
// module.exports = Person1;

// CJS 複數匯出(用{}包起來)
module.exports = { Person1, PI };
