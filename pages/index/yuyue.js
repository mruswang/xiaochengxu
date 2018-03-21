// pages/index/yuyue.js
let common = require('../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: [],
    id: '',
    is_pay: 1,
    name: '',
    price:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    let _id = options.id
    _this.setData({
      id: _id,
      name: options.name,
      price: options.price
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
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  cancle:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  formSubmit: function (e) {
    let _this = this
    let nickname = e.detail.value.nickname;
    let phone = e.detail.value.phone;
    let address = e.detail.value.address;
    let desc = e.detail.value.desc;
    let region = _this.data.region
    let regn = /^([\u4E00-\u9FA5]+|[a-zA-Z]+)$/
    let regp = /^(1+\d{10})$/
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
    if (region.length<0) {
      wx.showToast({
        title: '请选择地址',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (address == '') {
      wx.showToast({
        title: '请输入详细地址',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (desc.length > 150) {
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
    let use_id = wx.getStorageSync('use_id')
    wx.request({
      url: common.api + 'order/addorder',
      data: {
        real_name: nickname,
        phone: phone,
        address: address,
        remarks: desc,
        region: region[2],
        provice: region[0],
        city: region[1],
        goods_id: _this.data.id,
        is_pay: _this.data.is_pay,
        amount: _this.data.price,
        useid: use_id
      },
      method: 'POST',
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
              if (res.errMsg == "requestPayment:ok"){
                wx.showToast({
                  title: '支付成功！',
                  icon: 'success',
                  duration: 2000
                })
                setTimeout(() => {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 2000)
              }else{
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
      }
    })
  }
})