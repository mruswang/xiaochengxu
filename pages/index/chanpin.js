// pages/index/chanpin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: [
      { 'id': '1', 'name': '全部商品'},
      { 'id': '2', 'name': '净化治理' },
      { 'id': '3', 'name': '仪器设备' },
      { 'id': '4', 'name': '新风空气净化器' }
    ],
    currentid: '1',
    categoryShow: false,
    selectName: '全部商品',
    list: [
      { 'id': '1', 'imgurl': '../../img/img-banner-aboutus@2x.png', 'name':'新型负离子触媒'}
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
      categoryShow: false
    })
  },
  selectItem:function(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `cpdetails?id=${id}`
    })
  }
})