/*
HotCity城市选择器由HotApp小程序统计团队开发并开源：https://github.com/hotapp888/hotcity
城市完整SQL下载地址和API接口文档说明：http://wenda.hotapp.cn/article/3
小程序交流学习QQ群173063969
*/
//index.js
var districts = require('../district/district.js');
var hotapp = require('../../util/hotapp.js');
var app = getApp();
Page({
  data: {},
  onShow:function(){
      //接入HotApp小程序统计   统计页面打开次数
      hotapp.onEvent("startStyle1");
  },
  /**
   * 获取省份
   */
  getProvinces: function(event) {
    this.setData({
      showButton: false,
      showResult: false
    });
    districts.getProvinces(this);
  },

  /**
   * 获取城市
   */
  getCities: function(event) {
    districts.getCities(this, event);
  },

  /**
   * 获取地区
   */
  getDistricts: function(event) {
    districts.getDistricts(this, event);
  },

  /**
   * 完成
   */
  finish: function(event) {
    districts.finish(this, event);
  },
})
