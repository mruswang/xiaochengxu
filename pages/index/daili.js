// pages/index/daili.js
let common = require('../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSubmit: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  formSubmit: function (e) {
    let _this = this
    let use_id = wx.getStorageSync('use_id')
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    let nickname = e.detail.value.nickname;
    let phone = e.detail.value.phone;
    let regn = /^([\u4E00-\u9FA5]+|[a-zA-Z]+)$/
    let regp = /^(1+\d{10})$/
    if (!regn.test(nickname)){
      wx.showToast({
        title: '请保证姓名的真实性',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (!regp.test(phone)) {
      wx.showToast({
        title: '请保证电话号码的真实性',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    wx.showLoading({
      title: '提交中',
    })
    wx.request({
      url: common.api + 'agent/addagent', //仅为示例，并非真实的接口地址
      data: {
        real_name: nickname,
        phone: phone,
        id: use_id
      },
      method: 'POST',
      success: function (res) {
        wx.hideLoading()
        console.log(res)
        let _data = res.data;
        if (_data.status == 200) {
          _this.setData({
            isSubmit: true
          })
        }
      },
      fail: function(){
        wx.hideLoading()
      }
    })
  }
})