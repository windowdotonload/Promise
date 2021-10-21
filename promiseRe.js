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
