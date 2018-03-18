// pages/index/zixun.js
let common = require('../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
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
  formSubmit: function (e) {
    let _this = this
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    let nickname = e.detail.value.nickname;
    let phone = e.detail.value.phone;
    let email = e.detail.value.email;
    let desc = e.detail.value.desc;
    let regn = /^([\u4E00-\u9FA5]+|[a-zA-Z]+)$/
    let regp = /^(1+\d{10})$/
    let rege = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    if (!regn.test(nickname)) {
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
    if (!rege.test(email)) {
      wx.showToast({
        title: '请保证邮箱的真实性',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (desc.length>150) {
      wx.showToast({
        title: '请输入少于150字的备注',
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
        email: email,
        desc: desc,
        id: _this.data.id
      },
      method: 'POST',
      success: function (res) {
        wx.hideLoading()
        console.log(res)
        let _data = res.data;
        if (_data.status == 200) {
          wx.showToast({
            title: '提交成功！',
            icon: 'success',
            duration: 2000
          })
        }
      },
      fail: function () {
        wx.hideLoading()
      }
    })
  }
})