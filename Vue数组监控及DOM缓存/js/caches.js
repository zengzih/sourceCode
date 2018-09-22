/*
* vue的数组劫持以及模板缓存
*
* */
var Vue = (function(gobal, factory) {
  return factory.call(gobal);
})(this, function() {
  let _VUE_ = function(opts) {
    if(!opts.el) return;
    this._el = document.querySelector(opts.el);
    this.el = this._el.cloneNode(true);
    this._data = opts.data;
    this._el.parentNode.appendChild(this.el);
    this._el.remove();
    
    for(let property in this._data) {
      let value = this._data[property];
      if (this._data[property] instanceof Array) {
        addFunction.call(this, this._data, property, value);
      }
    }
  };
  function addFunction(data, property, value) {
    const _this = this;
    ['push', 'splice', 'shift', 'unshift', 'pop'].forEach(function(methods) {
      const origin = Array.prototype[methods];
      value[methods] = function() {
        console.log(arguments);
        const result = origin.apply(this, arguments);
        notify.call(_this, data, property, value);
        return result;
      };
    })
  }
  function notify(data, property, value) {
    const caches =  this._el.caches || [];
    const ul = this.el.querySelector('ul');
    if (caches.length === 0) {
      if (ul.children.length) {
        [].forEach.call([].slice.call(ul.children), function(child) {
          caches.push(child);
          ul.appendChild(child);
          child.remove();
        })
      }
    }
    value.forEach((child, index) => {
      if (caches[index]) {
        caches[index].innerHTML = child;
        ul.appendChild(caches[index]);
      } else {
        var li = document.createElement('li');
        li.innerHTML = child;
        ul.appendChild(li);
      }
    });
  }
  return _VUE_;
});