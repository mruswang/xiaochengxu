
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
    navid: 0
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
  selectNav:function(e){
    let status = e.currentTarget.dataset.status
    this.setData({
      navid: status
    })
  },
  check:function(){
    wx.navigateTo({
      url: 'odetails'
    })
  }
})