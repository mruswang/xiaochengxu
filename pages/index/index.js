//index.js
//获取应用实例
let common = require('../../utils/common.js')
Page({
  data: {
    imgUrls: [],
    indicatorDots: true,
    indicatorColor: "#fff",//滑动圆点颜色  
    indicatorActiveColor: "#FDBF38", //当前圆点颜色  
    autoplay: true,
    interval: 5000,
    duration: 1000,
    garid: [
      { "classname": 'item-j', 'imgurl': '../../img/icon-jiaquanjiance.png@2x.png', 'name': '甲醛检测'},
      { "classname": 'item-jq', 'imgurl': '../../img/icon-jiaquanzhili@2x.png', 'name': '甲醛治理' },
      { "classname": 'item-c', 'imgurl': '../../img/icon-chanpinzhongxin@2x.png', 'name': '产品中心' },
      { "classname": 'item-h', 'imgurl': '../../img/icon-huanbaozhishi@2x.png', 'name': '环保知识' },
      { "classname": 'item-g', 'imgurl': '../../img/icon-guanyuwom@2x.png', 'name': '关于我们' },
      { "classname": 'item-d', 'imgurl': '../../img/icon-zhaodaili@2x.png', 'name': '诚招代理' }
    ],
    connct: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getconnect()
    this.getlunbo()
  },
  go:function(e){
    let nowclass = e.currentTarget.dataset.classname
    if (nowclass === 'item-j') {
      wx.navigateTo({
        url: 'jqjc?id=1'
      })
    } else if (nowclass === 'item-jq') {
      wx.navigateTo({
        url: 'jqzl?id=2'
      })
    } else if (nowclass === 'item-c') {
      wx.navigateTo({
        url: 'chanpin'
      })
    } else if (nowclass === 'item-h') {
      wx.navigateTo({
        url: 'huanbao'
      })
    } else if (nowclass === 'item-g') {
      wx.navigateTo({
        url: 'about'
      })
    } else if (nowclass === 'item-d') {
      wx.navigateTo({
        url: 'daili'
      })
    }
  },
  callphone:function(e){
    let phone = e.target.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  getconnect:function(){
    let _this = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: common.api + 'connect/index', 
      success: function (res) {
        wx.hideLoading()
        let _data = res.data
        if (_data.status == 200){
          _this.setData({
            connct: _data.data[0]
          })
        }else{
          wx.showToast({
            title: '请求失败',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  getlunbo: function () {
    let _this = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: common.api + 'banner/index', 
      success: function (res) {
        let _data = res.data
        wx.hideLoading()
        if (_data.status == 200) {
          _this.setData({
            imgUrls: _data.data
          })
        } else {
          wx.showToast({
            title: '请求失败',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  }
})
