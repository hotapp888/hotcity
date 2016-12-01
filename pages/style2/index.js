/*
HotCity城市选择器由HotApp小程序统计团队开发并开源：https://github.com/hotapp888/hotcity
城市完整SQL下载地址和API接口文档说明：http://wenda.hotapp.cn/article/3
小程序交流学习QQ群173063969
*/
//index.js
var app = getApp();
var queryArea = require('../area/area.js');
//引入HotApp小程序统计SDK
var hotapp = require('../../util/hotapp.js');
Page({
  data: {},
  onLoad: function(options) {
    // Do some initialize when page load.
    //初始化地区选择器
    var that = this;
    queryArea.init(that,options);
  },
  onShow:function(){
      //接入HotApp小程序统计   统计页面打开次数
      hotapp.onEvent("startStyle2");
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
  save:function(e){
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
