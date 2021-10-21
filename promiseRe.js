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
  reject(res) {}

  then(onFULLFILLED, onREJECTED) {}
}
