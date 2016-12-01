//index.js
var districts = require('../district/district.js');
var app = getApp();
Page({
  data: {},
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
  save:function(){
    var selectedProvince = this.data.districts.selectedProvince;
    var selectedCity = this.data.districts.selectedCity;
    var selectedDistrict = this.data.districts.selectedDistrict;
    app.globalData.areaInfo = selectedProvince + selectedCity + selectedDistrict;
    wx.navigateBack();
  }
})
