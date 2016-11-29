//index.js
var queryArea = require('../city/city.js')
Page({
  data: {
      province:'',
      city:'',
      town:''
  },
  onLoad: function(options) {
    var that = this;
    //查询省份
    queryArea.query(function(area){
        that.setData({
            province:area
        })
        console.log(that.data.province)
    });
    // Do some initialize when page load.
  },
  onReady: function() {
    // Do something when page ready.
  },
  onShow: function() {
    // Do something when page show.
  },
  onHide: function() {
    // Do something when page hide.
  },
  onUnload: function() {
    // Do something when page close.
  },
  onPullDownRefresh: function() {
    // Do something when pull down.
  },
  onReachBottom: function() {
    // Do something when page reach bottom.
  },
  // Event handler.
  viewTap: function() {
    this.setData({
      text: 'Set some data for updating view.'
    })
  },
  customData: {
    hi: 'MINA'
  }
})
