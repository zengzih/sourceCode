/*
Function.prototype.binds = function(context) {
  var self = this; // this表示调用者，也就是fn;
  var arg = [].slice.call(arguments, 1);
  var func = function() {
    var args = [].slice.call(arguments);
    [].push.apply(arg, args)
    return self.apply(this instanceof func ? this : context, arg);
  }
  var FN = function() {};
  FN.prototype = this.prototype;
  func.prototype = new FN();
  return func;
}

var obj = {a: 1};

function fn() {
  console.log(this.a)
}

var callFn = fn.binds(obj, 11);
callFn(22);*/

Function.prototype.binds = function(context) { //  context: 指向binds的执行对象
  const _this = this;
  const args = [].slice.call(arguments, 1);
  const result = function() {
    return _this.apply(this instanceof result ? this : context, args.concat(arguments));
  };
  const FN = function() {};
  FN.prototype = this.prototype;
  result.prototype = new FN();
  return result;
};


var obj = {
  a: 1
}

function fn() {
  console.log(this.a);
}
let func = fn.binds(obj, 1);
func();