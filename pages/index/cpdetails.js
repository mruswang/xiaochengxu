// pages/index/cpdetails.js
let common = require('../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: {},
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    let _this = this;
    let _id = options.id
    _this.setData({
      id: _id
    })
    wx.request({
      url: common.api + 'goods/detail', 
      data: {
        id: _id
      },
      success: function (res) {
        wx.hideLoading()
        let _data = res.data
        if(_data.status == 200){
          _this.setData({
            content: _data.data
          })
        }else{
          wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
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
  zixun:function(){
    wx.navigateTo({
      url: 'zixun?id='+this.data.id
    })
  }
})