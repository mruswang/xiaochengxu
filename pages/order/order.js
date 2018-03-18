let common = require('../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    islogin: true,
    navlist: [
      { 'status': 0, 'name': '全部'},
      { 'status': 1, 'name': '未付款' },
      { 'status': 2, 'name': '已付款' },
      { 'status': 3, 'name': '已完成' }
    ],
    navid: 0,
    list: [],
    page: 1
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
    this.getinit()
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
  getinit:function(){
    wx.showLoading({
      title: '加载中',
    })
    let _this = this;
    let use_id = wx.getStorageSync('use_id')
    wx.request({
      url: common.api + 'goods/index', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        page: _this.data.page,
        status: _this.data.navid,
        userid: use_id
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res)
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