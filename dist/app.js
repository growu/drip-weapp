/**
 * WeChat API 模块
 * @type {Object}
 * 用于将微信官方`API`封装为`Promise`方式
 * > 小程序支持以`CommonJS`规范组织代码结构
 */
const wechat = require('./utils/wechat.js');
const baidu = require('./utils/baidu.js');

App({
  /**
   * Global shared
   * 可以定义任何成员，用于在整个应用中共享
   */
  globalData: {
    version: '0.1.0',
    userInfo: null
  },

  /**
   * WeChat API
   */
  wechat: wechat,

  /**
   * WeChat API
   */
  baidu: baidu,

  /**
   * 生命周期函数--监听小程序初始化
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  getUserInfo: function (cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo);
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo);
            }
          });
        }
      });
    }
  },
  onLaunch() {
    wechat.getLocation().then(res => {
      const { latitude, longitude } = res;
      return baidu.getCityName(latitude, longitude);
    }).then(name => {
      this.data.currentCity = name.replace('市', '');
      console.log(`currentCity : ${this.data.currentCity}`);
    }).catch(err => {
      this.data.currentCity = '北京';
      console.error(err);
    });
    console.log(' ========== Application is launched ========== ');
  },
  /**
   * 生命周期函数--监听小程序显示
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow() {
    console.log(' ========== Application is showed ========== ');
  },
  /**
   * 生命周期函数--监听小程序隐藏
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide() {
    console.log(' ========== Application is hid ========== ');
  }
});
//# sourceMappingURL=app.js.map
