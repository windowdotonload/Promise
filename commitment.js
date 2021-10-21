/*
 * @Descripttion:
 * @version:
 * @Author: windowdotonload
 */
class Commitment {
  static PENDING = "PENDING";
  static FULFILLED = "FULFILL";
  static REJECTED = "REJECT";
  status = Commitment.PENDING;
  resolveCallbacks = [];
  rejectCallbacks = [];
  result = null;
  constructor(func) {
    try {
      func(this.resolve.bind(this), this.reject.bind(this));
    } catch (e) {
      this.reject(e);
    }
  }

  resolve(res) {
    setTimeout(() => {
      if (this.status == Commitment.PENDING) {
        this.status = Commitment.FULFILL;
        this.result = res;
        this.resolveCallbacks.forEach((callback) => callback(res));
      }
    });
  }

  reject(res) {
    setTimeout(() => {
      if (this.status == Commitment.REJECTED) {
        this.status = Commitment.REJECTED;
        this.result = res;
        this.resolveCallbacks.forEach((callback) => callback(res));
      }
    });
  }

  then(onFULFULLED, onREJECTED) {
    return new Commitment((res, rej) => {
      onFULFULLED = typeof onFULFULLED == "function" ? onFULFULLED : () => {};
      onREJECTED = typeof onREJECTED == "function" ? onREJECTED : () => {};
      if (this.status == Commitment.PENDING) {
        this.resolveCallbacks.push(onFULFULLED);
        this.rejectCallbacks.push(onREJECTED);
      }
      if (this.status == Commitment.FULFILLED) {
        setTimeout(() => {
          onFULFULLED(this.result);
        });
      }
      if (this.status == Commitment.REJECTED) {
        setTimeout(() => {
          onREJECTED(this.result);
        });
      }
    });
  }
}

let com = new Commitment((res, rej) => {
  console.log(1);
  setTimeout(() => {
    console.log(2);
    res(4);
    console.log(3);
  });
});
com.then((res) => {
  console.log(res);
});
