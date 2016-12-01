/*
HotCity城市选择器由HotApp小程序统计团队开发并开源：https://github.com/hotapp888/hotcity
城市完整SQL下载地址和API接口文档说明：http://wenda.hotapp.cn/article/3
小程序交流学习QQ群173063969
*/
var host = 'https://wxapi.hotapp.cn/api/districts';
var districts = {
    provinces: [],
    cities: [],
    districts: [],
    showProvinces: false,
    showCities: false,
    showDistricts: false,
    selectedProvince: '',
    selectedCity: '',
    selectedDistrict: ''
};

//查询
function query(parent_adcode,cb){
    var adcode = '';

    //判断parent_adcode是不是function类型
    if((typeof parent_adcode == "function")){
        cb = parent_adcode;
    }else{
        adcode = parent_adcode;
    }

    wx.request({
        url: host, //仅为示例，并非真实的接口地址
        data: {
            parent_adcode: adcode 
        },
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
            typeof cb == "function" && cb(res.data)
        }
    })
}

/**
 * 获取省份
 */
function getProvinces(that) {
    query(function(data) {
        districts.provinces = data;
        if (data.length == 0) {
            getDistricts.showProvinces = false;
        } else {
            districts.showProvinces = true;
        }
        districts.showCities = false;
        districts.showDistricts = false;
        districts.selectedCity = '';
        districts.selectedDistrict = '';
        that.setData({
            districts: districts
        });
    });
}

/**
 * 获取城市
 */
function getCities(that, event) {
    var adcode = event.currentTarget.dataset.adcode;
    var provinceName = event.currentTarget.dataset.name;
    query(adcode, function(data) {
        districts.cities = data;
        districts.selectedProvince = provinceName;  
        districts.showProvinces = false;
        if (data.length == 0) {
            districts.showCities = false;
        } else {
            districts.showCities = true;
        }
        districts.selectedDistrict = '';
        districts.showDistricts = false;
        that.setData({
            districts: districts
        });
    });
}

/**
 * 获取地区
 */
function getDistricts(that, event) {
    var adcode = event.currentTarget.dataset.adcode;
    var cityName = event.currentTarget.dataset.name;
    query(adcode, function(data) {
        districts.districts = data;
        districts.selectedCity = cityName; 
        districts.showProvinces = false;
        districts.showCities = false;
        if (data.length == 0) {
            districts.showDistricts = false;
        } else {
            districts.showDistricts = true;
        }
        that.setData({
            districts: districts
        });
        console.log(that.data);
    });
}

/**
 * 选择完成
 */
function finish(that, event) {
    districts.showProvinces = false;
    districts.showCities = false;
    districts.showDistricts = false;
    districts.selectedDistrict = event.currentTarget.dataset.name;
    that.setData({
        districts: districts
    });
}

module.exports = {
  getProvinces: getProvinces,
  getCities: getCities,
  getDistricts: getDistricts,
  finish: finish
}