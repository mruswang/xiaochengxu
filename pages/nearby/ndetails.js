// pages/nearby/ndetails.js
let common = require('../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    let _id = options.id
    let _long = options.long
    let _lat = options.lat
    this.getinit(_id, _long, _lat)
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
  getinit: function (_id,_long, _lat) {
    let _this = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: common.api + 'shop/index',
      data: {
        id: _id,
        lon: _long,
        lat:_lat
      },
      success: function (res) {
        wx.hideLoading()
        _this.setData({
          content: res.data.data[0]
        })
      }
    })
  }
})