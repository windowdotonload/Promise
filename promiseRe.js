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

  // then中异步和resolve，reject中的异步是不同的
  // then中的异步是为了执行到then时异步
  // resolve和reject中的异步是为了在调取callbacks数组是异步，否则会同步
  // 调用then时如果状态确定了，那么执行回调
  // 如果没有确定状态，那么缓存回调函数，之后在确定状态后再次回调
  // 也就是说res的作用其实有两个
  // 一是确定状态
  // 二是当状态的确定是在异步中的，那么确定状态后还会再次回调
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
