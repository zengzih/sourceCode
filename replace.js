var str = 'pp{{ name }}aa{{age}}';
var reg = /\{\{(.*)\}\}/g;
var rep = /(\{\{)|(\}\})/g;




var re = /\{\{(.*?)\}\}/g;
var array = [];
var temp;
while (temp = re.exec(str)) {
  array.push(temp[0])
}
console.log(array);

var data = {
  name: 'dingding',
  age: 20
};
var newStr = str.replace(re, function(elt) {
  var repStr = elt.replace(rep, '');
  console.log(repStr);
  return data[repStr.trim()];
});
console.log(newStr);