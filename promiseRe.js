/*
 * @Descripttion:
 * @version:
 * @Author: windowdotonload
 */

// origin Promise

const pro = new Promise((res, rej) => {
  console.log(1);
  setTimeout(() => {
    console.log(2);
    res(3);
    console.log(4);
  }, 1000);
  console.log(5);
});
pro.then((res) => console.log(res));
console.log(6);

class Promisere {
  static PENDING = "PENDING";
  static REJECTED = "REJECT";
  static FULLFILLED = "FULLFILLED";
  STATUS = Promisere.PENDING;
  RESULT = null;
  resolveCallbacks = [];
  rejectCallbacks = [];
  constructor(func) {
    try {
      func(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }
  resolve(res) {
    this.STATUS = Promisere.FULLFILLED;
    this.RESULT = res;
  }
  reject(res) {
    this.STATUS = Promisere.REJECTED;
    this.RESULT = res;
  }

  then(onFULLFILLED, onREJECTED) {
    switch (this.STATUS) {
      case Promisere.PENDING:
        this.resolveCallbacks.push(onFULLFILLED);
        this.rejectCallbacks.push(onREJECTED);
        break;
      case Promisere.FULLFILLED:
        setTimeout(() => {
          onFULLFILLED(this.RESULT);
        });
        break;
      case Promisere.REJECTED:
        setTimeout(() => {
          onREJECTED(this.RESULT);
        });
        break;
    }
  }
}
