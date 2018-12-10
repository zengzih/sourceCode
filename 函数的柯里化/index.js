/*
   * 柯里化的特点：
   *   1、参数复用
   *   2、提前返回
   *   3、延迟执行
   *
   *
 */

// 参数的复用：
(function () {
  function curryAdd(a) {
    return function (b) {
      return function (c) {
        return a + b + c;
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
    return function () {
      if (arguments.length === 0) {
        return result.reduce(function (a, b) {
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
  
})();

// 提前返回
/*const addEvent = (function() {
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
})();*/


// 延迟执行
const curryScore = function (fn) {
  let result = [];
  return function () {
    if (arguments.length == 0) {
      return fn.apply(null, result);
    } else {
      result = result.concat([].slice.call(arguments));
    }
  }
};
var allScore = 0;
var curryAddScore = curryScore(function () {
  var i = 0, len = arguments.length;
  for (i; i < len; i++) {
    allScore += arguments[i];
  }
});

curryAddScore(10);
curryAddScore(2);
curryAddScore(30);
curryAddScore(13);
curryAddScore();
console.log(allScore);

function square(i) {
  return i * i;
}

function dubble(i) {
  return i * 2;
}

function map(handler, list) {
  return list.map(handler);
}

const SquareMap = map(square, [1, 2, 3, 4, 5, 6]);
console.log(SquareMap);

const dubbleMap = map(dubble, [1, 2, 3, 4, 5, 6]);
console.log(dubbleMap);


(function () {
  function curry(fn, args) {
    var length = fn.length;
    args = args || [];
    return function () {
      var _args = args.slice(0), arg, i;
      for (i = 0; i < arguments.length; i++) {
        arg = arguments[i];
        _args.push(arg);
      }
      if (_args.length < length) {
        console.log(this);
        return curry.call(this, fn, _args);
      } else {
        console.log(this);
        return fn.apply(this, _args);
      }
    }
  }
  
  function add(a, b, c) {
    return a + b + c;
  }
  
  const addCurry = curry(add);

const curryAdd5 = curry(add)(5);
//  const curryAdd5 = curry(add, [5])
  
  console.log(addCurry(5)(10)(15));
  console.log(addCurry(5)(10)(15));
  console.log(addCurry(5)(10)(15));
  console.log(curryAdd5(10, 15));
})();









