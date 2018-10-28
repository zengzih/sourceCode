function addFunction(data) {
  let _this = this;
  ['push', 'shift', 'unshift', 'pop', 'splice', 'slice'].forEach(function(method) {
    const ori = Array.prototype[method];
    data[method] = function() {
      console.log(this, arguments);
      ori.apply(this, arguments);
    }
  });
}

var arr = [1, 2, 3, 4];
addFunction(arr);
arr.push(5);
console.log(arr);
