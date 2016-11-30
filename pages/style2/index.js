//index.js
var queryArea = require('../area/area.js')
Page({
  data: {

  },
  onLoad: function(options) {
    // Do some initialize when page load.
    //初始化地区选择器
    var that = this;
    queryArea.init(that,options);
  },
  //显示地区
  showArea:function(e){
    var that = this;
    queryArea.showArea(that,e);
  },
  //隐藏选择器
  hideArea:function (e){
    var that = this;
    queryArea.hideArea(that,e);
  },
  //选择地区
  selectArea:function(e){
      var that = this;
      queryArea.selectArea(that,e);
  },
  //获取地区信息
  getAreaInfo:function(e){
    var that = this;
    //获取以选择的省份信息
    var province = queryArea.getProvince(that,e);
    console.log(province)
    //获取以选择的城市信息
    var city = queryArea.getCity(that,e);
    console.log(city)
    //获取以选择的县/镇信息
    var district = queryArea.getDistrict(that,e);
    console.log(district)
  }
})
