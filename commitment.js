/*
 * @Descripttion:
 * @version:
 * @Author: windowdotonload
 */
class Commitment {
  static PENDING = "PENDING";
  static FULFILL = "FULFILL";
  static REJECT = "REJECT";
  status = Commitment.PENDING;
  constructor(func) {
    func(this.resolve.bind(this), this.reject.bind(this));
  }

  resolve() {
    console.log(this.status);
  }

  reject() {}

  then() {}
}

let com = new Commitment((res, rej) => {
  res("123");
});
