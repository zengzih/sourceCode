(function(gobal, factory) {
  gobal.MyVue = factory;
})(this, function(opt) {
  var matcher = /<%=([\s\S]+?)%>|<%([\s\S]+?)%>|$/g;
  var el = document.querySelector(opt.el); // 渲染到指定的标签
  var tem = document.querySelector(opt.template).innerHTML; // 渲染的模板
  var data = opt.data; // 渲染的数据
  
  // 特殊文字的转义处理
  var escaper = /\\|'|\r|\t|\n|\u2028|\u2029/g;
  var escapes = {
    "'": "'",
    "\\": "\\",
    "\r": "r",
    "\n": "n",
    "\t": "t",
    "\u2028": "u2028",
    "\u2029": "u2029"
  };
  
  var Template = function(text, data) {
    var index = 0; // 从什么位置开始解析
    var function_body = "var dataHtml = '';";
    function_body += "dataHtml +='";
    
    text.replace(matcher, function(match, interpolate, evaluate, offset) { // interpolate evaluate表示每次被正则匹配到的值 offset：表示被匹配到的位置（下标）
      function_body += text.slice(index, offset).replace(escaper, function(match) {
        return "\\" + escapes[match];
      });
      if (evaluate) {
        function_body += "';" + evaluate + "dataHtml +='";
      }
      if (interpolate) {
        function_body += "' +" + interpolate + " +'";
      }
      index = offset + match.length;
      return match;
    });
    
    function_body += "';return dataHtml;";
    var render = new Function('obj', function_body);
    return render(data);
  }
  el.innerHTML = Template(tem, data)
});
