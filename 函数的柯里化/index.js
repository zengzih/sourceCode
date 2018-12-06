/*
   * 柯里化的特点：
   *   1、参数复用
   *   2、提前返回
   *   3、延迟执行
   *
   *
 */

// 参数的复用：
function curryAdd(a) {
  return function(b) {
    return function (c) {
      return a + b +c;
    }
  }
}
const add5 = curryAdd(5);
const add15 = add5(10);
console.log(add5(10)(15));
console.log(add15(15))
// const curryAdd = (a)=> (b) => (c) => a + b+ c;

function add() {
  const result = [];
  return function() {
    if (arguments.length === 0) {
      return result.reduce(function(a, b) {
        return a + b;
      }, 0);
    }
    [].push.apply(result, [].slice.call(arguments));
    return arguments.callee;
  }
}

const sum = add();
console.log('-----sum----');
console.log(sum(1)(2)(3)());



// 提前返回
const addEvent = (function() {
  if (window.addEventListener) {
    return function(el, type, fn, capture) {
      el.addEventListener(type, function(e) {
        fn.call(el, e);
      }, capture)
    }
  } else if(window.attachEvent) {
    return function(el, type, fn, capture) {
      el.attachEvent('on' + type, function(e) {
        fn.call(el, e);
      }, capture)
    }
  }
})();


// 延迟执行












