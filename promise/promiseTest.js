const MyPromise = (function(factory, gobal) {
  return factory.call(gobal);
})(function() {
  const status = {
    pending: 'PENDING',
    fulfilled: 'FULFILLED',
    reject: 'REJECT'
  };
  class MyPromise {
    constructor(func) {
      this.resolveFuncResult = [];
      this.rejectFuncResult = [];
      this.value = null;
      this.error = null;
      this._status = status.pending;
      this._handler(func);
    }
    _handler(func) {
      let done = false;
      func(
        (resolveVal)=> {
          if (done) return;
          done = true;
          let then = this._getThen(resolveVal);
          if (then) {
            return this._handler(then.bind(resolveVal))
          }
          this._resolve(resolveVal);
        },
        (resolveVal)=> {
          if (done) return;
          done = true;
          this._reject(resolveVal);
        }
      )
    }
    _getThen(promise) {
      let type = typeof promise;
      let then = null;
      if (promise && (type === 'function' || type === 'object')) {
        if (then = promise.then) {
          return then;
        }
      }
      return then;
    }
    _resolve(value) {
      this.value = value;
      setTimeout(()=> {
        console.log(this.resolveFuncResult);
        this.resolveFuncResult.forEach(callback=> {
          callback(value);
        });
      })
    }
    _reject(error) {
      this.error = error;
      setTimeout(()=> {
        this.rejectFuncResult.forEach(callback=> {
          callback(error);
        });
      })
    }
    _done(resolveFunc, rejectFunc) {
      resolveFunc = typeof resolveFunc === 'function' ? resolveFunc : null;
      rejectFunc = typeof rejectFunc === 'function' ? rejectFunc : null;
      if (this._status === status.pending) {
        resolveFunc && this.resolveFuncResult.push(resolveFunc);
        rejectFunc && this.rejectFuncResult.push(rejectFunc);
      } else if (this._status === status.fulfilled) {
        resolveFunc(this.value);
      } else if (this._status == status.reject) {
        rejectFunc(this.error);
      }
    }
    then(resolveFunc, rejectFunc) {
      // this._done(resolveFunc, rejectFunc);
      return new MyPromise((resolve, reject)=> {
        this._done(
          (value)=> {
            if (typeof resolveFunc !== 'function') {
              return resolve(value);
            }
            resolve(resolveFunc(value));
          },
          (error)=> {
            if (typeof rejectFunc !== 'function') {
              return reject(error);
            }
            reject(rejectFunc(error));
          }
        )
      });
    }
  }
  return MyPromise;
}, this);

const p = new MyPromise((resolve, reject)=> {
  setTimeout(()=> {
    resolve('-------测试---------');
  }, 3000)
});
p.then((data)=> {
  console.log('---1----');
  console.log(data);
  // return new MyPromise(function(resolve) {
  //   resolve('链式调用')
  // })
  return '哈哈哈';
}, (reject)=> {
}).then((data)=> {
  console.log('----data----');
  console.log(data);
});

/*
const p1 = new Promise((resolve, reject) => {
  reject('-----失败-----');
});
p1.then(function(resolve) {
  console.log('-----resolve-----');
  console.log(resolve);
}, function(reject) {
  console.log('-------reject-----');
  console.log(reject);
})*/
