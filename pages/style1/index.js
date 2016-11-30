//index.js
var districts = require('../district/district.js')
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
  }
})
