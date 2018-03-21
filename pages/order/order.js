let common = require('../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    islogin: true,
    navlist: [
      { 'status': 0, 'name': '全部'},
      { 'status': 10, 'name': '未付款' },
      { 'status': 20, 'name': '已付款' },
      { 'status': 30, 'name': '已完成' }
    ],
    navid: 0,
    list: [],
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getinit()
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
    this.setData({
      page: this.data.page + 1
    })
    this.getinit()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  selectNav:function(e){
    let status = e.currentTarget.dataset.status
    this.setData({
      navid: status,
      list: [],
      page: 1
    })
    this.getinit();
  },
  check:function(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `odetails?id=${id}`
    })
  },
  pay:function(e){
    let _this= this
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
               _this.getinit()
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
  getinit:function(){
    wx.showLoading({
      title: '加载中',
    })
    let _this = this;
    let use_id = wx.getStorageSync('use_id')
    wx.request({
      url: common.api + 'order/index', 
      data: {
        page: _this.data.page,
        status: _this.data.navid,
        id: use_id
      },
      success: function (res) {
        wx.hideLoading()
        let _data = res.data
        if (_data.status == 200) {
          if (_data.data.length > 0) {
            _this.setData({
              list: _this.data.list.concat(_data.data)
            })
          } else {
            wx.showToast({
              title: '已加载所有数据',
              icon: 'none',
              duration: 2000
            })
          }
        } else {
          wx.showToast({
            title: _data.message,
            icon: 'none',
            duration: 2000
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
  }  
})