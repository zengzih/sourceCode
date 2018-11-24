const p = new Promise(resolve=> {
  resolve('--P--')
});

const p1 = new Promise(resolve=> {
  resolve(p);
});

p1.then(data=> {
  console.log('------data------');
  console.log(data);
});
