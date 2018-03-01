// pages/index/huanbao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      { "title": '认为只用植物就能清除空气污染', "lai": '未知', "author": 'admin ', 'time': '2016.04.03', 'id': '1' },
      { "title": '装修完后为什么要做室内污染治理？', "lai": '未知', "author": 'admin ', 'time': '2016.04.03', 'id': '2' },
      { "title": '认为只用植物就能清除空气污染', "lai": '未知', "author": 'admin ', 'time': '2016.04.03', 'id': '3'},
      ]
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
  go: function (e) {
    console.log(e)
    let nowid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `hdetails?id=${nowid}`
    })
  }
})