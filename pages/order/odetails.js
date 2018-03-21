// pages/order/odetails.js
let common = require('../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: {},
    connct: {},
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    let _id = options.id
    _this.setData({
      id: _id
    })
    this.getinit(_id)
    this.getconnect()
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
  getconnect: function () {
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
            connct: res.data.data[0]
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
  },
  callphone: function (e) {
    let phone = e.target.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  pay: function (e) {
    let _this = this
    let ordersn = e.currentTarget.dataset.ordersn
    let price = e.currentTarget.dataset.price
    let use_id = wx.getStorageSync('use_id')
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: common.api + 'order/orderpay', 
      method: 'POST',
      data: {
        useid: use_id,
        ordersn: ordersn,
        price: price
      },
      success: function (res) {
        wx.hideLoading()
        let _data = res.data;
        if (_data.status == 200) {
          wx.requestPayment({
            'timeStamp': _data.info.timeStamp,
            'nonceStr': _data.info.nonceStr,
            'package': _data.info.package,
            'signType': _data.info.signType,
            'paySign': _data.info.paySign,
            'success': function (res) {
              if (res.errMsg == "requestPayment:ok") {
                wx.showToast({
                  title: '支付成功！',
                  icon: 'success',
                  duration: 2000
                })
                _this.getinit(_this.data.id);
              } else {
                wx.showToast({
                  title: '支付失败！',
                  icon: 'none',
                  duration: 2000
                })
              }
            },
            'fail': function (res) {
              wx.showToast({
                title: '支付失败！',
                icon: 'none',
                duration: 2000
              })
            }
          })
        }
      },
      fail: function (err) {
        wx.hideLoading()
        wx.showToast({
          title: '请求失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  getinit:function(_id){
    let _this = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: common.api + 'order/orderdetail', 
      data: {
        order_id: _id
      },
      success: function (res) {
        wx.hideLoading()
        _this.setData({
          content: res.data.data
        })
      }
    })
  }
})