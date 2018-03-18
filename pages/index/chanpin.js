// pages/index/chanpin.js
let common = require('../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: [],
    page: 1,
    currentid: '1',
    categoryShow: false,
    selectName: '全部商品',
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getcategory()
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
  showCategory:function(){
    if (this.data.categoryShow){
      this.setData({ categoryShow: false });
    }else{
      this.setData({ categoryShow: true });
    }
  },
  selectCategory:function(e){
    let item = e.currentTarget.dataset.item
    this.setData({
      currentid: item.id,
      selectName: item.name,
      categoryShow: false,
      list: [],
      page: 1
    })
    this.getinit();
  },
  selectItem:function(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `cpdetails?id=${id}`
    })
  },
  getinit: function () {
    wx.showLoading({
      title: '加载中',
    })
    let _this = this;
    wx.request({
      url: common.api + 'goods/index', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        page: _this.data.page,
        cat_id: _this.data.currentid
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
  },
  getcategory: function(){
    wx.showLoading({
      title: '加载中',
    })
    let _this = this;
    wx.request({
      url: 'https://dev.halsoft.net/v1/goods/catgary', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res)
        let _data = res.data
        if (_data.status == 200) {
          _this.setData({
            category: _data.data
          })
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