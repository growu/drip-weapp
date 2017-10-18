/**
 * WeChat API 模块
 * @type {Object}
 * 用于将微信官方`API`封装为`Promise`方式
 * > 小程序支持以`CommonJS`规范组织代码结构
 */
const wechat = require('./utils/wechat.js')
// const baidu = require('./utils/baidu.js')


App({
  /**
   * Global shared
   * 可以定义任何成员，用于在整个应用中共享
   */
  globalData: {
    version: '0.1.0',
    apiHost:'https://www.keepdays.com/index.php/api/',
    userInfo: null
  },

  /**
   * WeChat API
   */
  wechat: wechat,

  /**
   * WeChat API
   */
  /**
   * 生命周期函数--监听小程序初始化
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
   getUserInfo:function(cb){
    var that = this;
    console.log(this.globalData.userInfo);
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (res) {
          if(res.code) {
            wx.getUserInfo({
              success: function (res) {
                var param = {};

                param = res.userInfo;
                param.provider = 'weapp';

                that.globalData.userInfo = res.userInfo;
                typeof cb == "function" && cb(that.globalData.userInfo)

                wx.request({
                  url:  that.globalData.apiHost+"auth/oauth", //仅为示例，并非真实的接口地址
                  data: param,
                  method: POST,
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function(res) {
                    if(res.data.status) {
                       if(res.data.user.email) {
                         that.globalData.userInfo.token = res.data.token;
                       }
                    }
                    console.log(res.data)
                  }
                })
              }
            });
          } else {
            wx.showToast({
              title: '登录失败:'+res.errMsg,
              duration: 3000
            });
          }
        },
        fail: function(res) {
          wx.showToast({
            title: '登录失败:'+res.errMsg,
            duration: 3000
          });
        }
      });
    }
  },
  onLaunch () {
    var that = this;
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else {
      //调用登录接口
      wx.login({
        success: function (res) {
          if (res.code) {
            wx.getUserInfo({
              success: function (res) {
                var param = {};

                param = res.userInfo;
                param.provider = 'weapp';

                that.globalData.userInfo = res.userInfo;
                typeof cb == "function" && cb(that.globalData.userInfo)

                wx.request({
                  url: that.globalData.apiHost + "auth/oauth", //仅为示例，并非真实的接口地址
                  data: param,
                  method: "POST",
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function (res) {
                    if (res.data.status) {
                      if (res.data.user.email) {
                        that.globalData.userInfo.token = res.data.token;
                      }
                    }
                    console.log(res.data)
                  }
                })
              }
            });
          } else {
            wx.showToast({
              title: '登录失败:' + res.errMsg,
              duration: 3000
            });
          }
        },
        fail: function (res) {
          wx.showToast({
            title: '登录失败:' + res.errMsg,
            duration: 3000
          });
        }
      });
      // wechat.getLocation()
      //   .then(res => {
      //     const { latitude, longitude } = res
      //     // return baidu.getCityName(latitude, longitude)
      //   })
      //   .then(name => {
      //     // this.data.currentCity = name.replace('市', '')
      //     // console.log(`currentCity : ${this.data.currentCity}`)
      //   })
      //   .catch(err => {
      //     // this.data.currentCity = '北京'
      //     // console.error(err)
      //   })
    }
    console.log(' ========== Application is launched ========== ')
  },
  /**
   * 生命周期函数--监听小程序显示
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow () {
    console.log(' ========== Application is showed ========== ')
  },
  /**
   * 生命周期函数--监听小程序隐藏
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide () {
    console.log(' ========== Application is hid ========== ')
  }
})
