// index.js
// 获取应用实例
var app = getApp()
Page({
  data: {
    checkboxItems: [
          {name: '我要早起', value: '0', checked: true},
          {name: '练成马甲线', value: '1'}
    ],
    userInfo: {}
  },
  checkboxChange: function (e) {
        console.log('checkbox发生change事件，携带value值为：', e.detail.value);

        var checkboxItems = this.data.checkboxItems, values = e.detail.value;
        for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
            checkboxItems[i].checked = false;

            for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
                if(checkboxItems[i].value == values[j]){
                    checkboxItems[i].checked = true;
                    break;
                }
            }
        }

        this.setData({
            checkboxItems: checkboxItems
        });
    },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    // // 调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   // 更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })
  }
})
