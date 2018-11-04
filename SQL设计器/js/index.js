var tableBlock = {
  data: {
    isDown: false,
    clientX: 0,
    clientY: 0,
    left: 0,
    top: 0
  },
  components: {
    MinTable: {
      props: {
        data: Array,
        column: Array
      },
      render: function(h) {
        var _this = this;
        var data = this.data || [];
        var column = this.column || [];
        return h('div', {
          class: 'el-table el-table--fit el-table--striped  el-table--enable-row-hover el-table--enable-row-transition'
        }, [
          h('div', {
            class: 'el-table__body-wrapper'
          }, [
            h('table', {
              class: 'el-table__body',
              domProps: {
                cellspacing: '0',
                cellpadding: '0',
                border: '0'
              }
            }, [
              h('tbody',{}, [
                data.map(function(row) {
                  return h('tr', {
                    class: 'el-table__row',
                    on: {
                      dblclick: function () {
                        _this.$emit('row-click', row);
                      }
                    }
                  }, [
                    column.map(function(col) {
                      return h('td', {}, [
                        h('div', { class: 'cell' }, row[col.prop])
                      ])
                    })
                  ])
                })
              ])
            ])
          ])
        ])
      }
    }
    
  },
  methods: {
    handleRevert: function(parent) {
      parent.panelExpand = false;
    },
    handleRowDblClick: function(row, parent) {
      parent.panelExpand = true;
      
    },
    getTableBlockStyle: function(item) {
      return 'left: ' + item.positionX + 'px;top:' + item.positionY + 'px;'
    },
    handleClose: function(item) {
      // 删除表
    },
    handleMouseDown: function(e, item) {
      var target = e.target;
      while(target.className !== 'table_block') {
        target = target.parentNode;
      }
      this.isDown = true;
      target.style.cursor = 'move';
      this.clientX = e.clientX;
      this.clientY = e.clientY;
      this.left = target.offsetLeft;
      this.top = target.offsetTop;
      document.onmousemove = (function(e) {
        if (this.isDown == false) {
          return;
        }
        target.style.cursor = 'default';
        var nx = e.clientX;
        var ny = e.clientY;
        var positionX = nx - (this.clientX - this.left);
        var positionY = ny - (this.clientY - this.top);
        if (positionX <= 0) {
          positionX = 0;
        }
        if (positionY <= 0) {
          positionY = 0;
        }
        item.positionX = positionX;
        item.positionY = positionY;
      }.bind(this));
      document.onmouseup = (function() {
        this.isDown = false;
        target.style.cursor = 'default';
        document.onmousemove = null;
        document.onmouseup = null;
      }.bind(this));
    },
    // 编辑form
    handleEditHeader: function(item) {
    
    },
    getDomClient: function() {
      var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
      var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
      return {
        clientWidth: clientWidth,
        clientHeight: clientHeight
      };
    }
  }
}

