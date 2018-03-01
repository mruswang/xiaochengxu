//index.js
//获取应用实例

Page({
  data: {
    imgUrls: [
      '../../img/img-banner-aboutus@2x.png',
      '../../img/img-banner-huanbaozhishi@2x.png',
      '../../img/img-banner-shouye1@2x.png',
      '../../img/img-banner-shouye2@2x.png',
      '../../img/img-banner-shouye3@2x(1).png'
    ],
    indicatorDots: true,
    indicatorColor: "#fff",//滑动圆点颜色  
    indicatorActiveColor: "#FDBF38", //当前圆点颜色  
    autoplay: true,
    interval: 5000,
    duration: 1000,
    garid: [
      { "classname": 'item-j', 'imgurl': '../../img/icon-jiaquanjiance.png@2x.png', 'name': '甲醛检测'},
      { "classname": 'item-jq', 'imgurl': '../../img/icon-jiaquanzhili@2x.png', 'name': '甲醛治理' },
      { "classname": 'item-c', 'imgurl': '../../img/icon-chanpinzhongxin@2x.png', 'name': '产品中心' },
      { "classname": 'item-h', 'imgurl': '../../img/icon-huanbaozhishi@2x.png', 'name': '环保知识' },
      { "classname": 'item-g', 'imgurl': '../../img/icon-guanyuwom@2x.png', 'name': '关于我们' },
      { "classname": 'item-d', 'imgurl': '../../img/icon-zhaodaili@2x.png', 'name': '诚招代理' }
    ]
  },
  go:function(e){
    let nowclass = e.currentTarget.dataset.classname
    if (nowclass === 'item-j') {
      wx.navigateTo({
        url: 'jqjc'
      })
    } else if (nowclass === 'item-jq') {
      wx.navigateTo({
        url: 'jqzl'
      })
    } else if (nowclass === 'item-c') {
      wx.navigateTo({
        url: 'chanpin'
      })
    } else if (nowclass === 'item-h') {
      wx.navigateTo({
        url: 'huanbao'
      })
    } else if (nowclass === 'item-g') {
      wx.navigateTo({
        url: 'about'
      })
    } else if (nowclass === 'item-d') {
      wx.navigateTo({
        url: 'daili'
      })
    }
  }
})
