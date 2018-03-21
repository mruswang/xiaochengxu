// pages/nearby/nearby.js
let common = require('../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    long: '',
    lat: '',
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.grtaddress()
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
  //获取定位
  grtaddress:function(){
    let _this = this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        if (res.errMsg == 'getLocation:ok'){
          let latitude = res.latitude
          let longitude = res.longitude
          _this.setData({
            long: longitude ,
            lat: latitude
          })
          _this.getneary()
        }
        // var speed = res.speed
        // var accuracy = res.accuracy
      }
    })
  },
  selectItem:function(e){
    let _id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `ndetails?id=${_id}&long=${this.data.long}&lat=${this.data.lat}`
    })
  },
  getneary:function(){
    let _this = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: common.api + 'shop/index',
      data: {
        lon: _this.data.long,
        lat: _this.data.lat
      },
      success: function (res) {
        wx.hideLoading()
        let _data = res.data
        if (_data.status == 200) {
          _this.setData({
            list: _data.data
          })
        } else {
          wx.showToast({
            title: _data.message,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  }
})