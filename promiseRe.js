/*
 * @Descripttion:
 * @version:
 * @Author: windowdotonload
 */

// origin Promise

// const pro = new Promise((res, rej) => {
//   console.log(1);
//   res(7);
//   setTimeout(() => {
//     console.log("settimeout");
//     console.log(2);
//     // res(3);
//     console.log(4);
//   });
//   console.log(5);
// });
// pro.then((res) => {
//   console.log("then");
//   console.log(res);
// });
// console.log(6);

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
    if (this.STATUS == Promisere.PENDING) {
      this.STATUS = Promisere.FULLFILLED;
      this.RESULT = res;
      setTimeout(() => {
        this.resolveCallbacks.forEach((callback) => callback(this.RESULT));
      });
    }
  }
  reject(res) {
    if (this.STATUS == Promisere.PENDING) {
      this.STATUS = Promisere.REJECTED;
      this.RESULT = res;
      setTimeout(() => {
        this.s.forEach((callback) => callback(this.RESULT));
      });
    }
  }

  // then中异步和resolve，reject中的异步是不同的
  // then中的异步是为了执行到then时异步
  // resolve和reject中的异步是为了在调取callbacks数组是异步，否则会同步
  // 调用then时如果状态确定了，那么执行回调
  // 如果没有确定状态，那么缓存回调函数，之后在确定状态后再次回调
  // 也就是说res的作用其实有两个
  // 一是确定状态
  // 二是当状态的确定是在异步中的，那么确定状态后还会再次回调
  // 换句话说then中的回调如果在then阶段没有调用，那么最终回归到resovle或者reject阶段调用
  then(onFULLFILLED, onREJECTED) {
    // return new Promisere((res, rej) => {
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
    // });
  }
}

const pro = new Promisere((res, rej) => {
  console.log(1);
  res(7);
  setTimeout(() => {
    console.log("settimeout");
    console.log(2);
    // res(3);
    console.log(4);
  });
  console.log(5);
});
pro.then((res) => {
  console.log("then");
  console.log(res);
});
console.log(6);
