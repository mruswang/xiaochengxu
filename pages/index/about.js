// pages/index/about.js
let common = require('../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: {},
    connct: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getinit()
    this.getconnct()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  callphone: function (e) {
    let phone = e.target.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  getinit: function () {
    let _this = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: common.api + 'about/index',
      success: function (res) {
        let _data = res.data
        wx.hideLoading()
        if (_data.status == 200) {
          _this.setData({
            content: _data.data[0]
          })
        } else {
          wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  getconnct: function () {
    let _this = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: common.api + 'connect/index', 
      success: function (res) {
        let _data = res.data
        wx.hideLoading()
        if (_data.status == 200) {
          _this.setData({
            connct: _data.data[0]
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