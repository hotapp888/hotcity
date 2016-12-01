/*
HotCity城市选择器由HotApp小程序统计团队开发并开源：https://github.com/hotapp888/hotcity
城市完整SQL下载地址和API接口文档说明：http://wenda.hotapp.cn/article/3
小程序交流学习QQ群173063969
*/
var host = 'https://wxapi.hotapp.cn/api/districts';
var areaData = {
    areaList:'',
    province:'',
    city:'',
    district:'',
    areaListShow:'',
    districtShow:''
}
//初始化
function init(that,e){
    areaData.areaList = '';
    areaData.province = '';
    areaData.city = '';
    areaData.district = '';
    areaData.areaListShow = false;
    areaData.districtShow = true;
    that.setData({
        areaData:areaData
    })
}
//查询地区信息
function query(area_id,that,cb){
    wx.request({
        url: host, //仅为示例，并非真实的接口地址
        data: {
            parent_adcode: area_id
        },
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
            console.log(res)
            typeof cb == "function" && cb(res);
        }
    })
};
//显示弹出框 并判断地区的级别
function showArea(that,e){
    console.log(e)
    var area_id;
    var level = e.target.id;
    var item = e.target.dataset;

    if(level == 'province'){
        area_id = '';
    }
    if(level == 'city'){
        area_id = areaData.province.adcode;
    }
    if(level == 'district'){
        area_id = areaData.city.adcode;
    }

    query(area_id,that,function(res){
        areaData.areaListShow = true;
        areaData.areaList = res.data;
        that.setData({
            areaData : areaData
        })
    });
};
//隐藏弹出框
function hideArea(that,e){
    areaData.areaListShow = false;
    that.setData({
        areaData : areaData
    })
};
//选择地区事件
function selectArea(that,e){
    //获取当前选择的地区的信息
    var item = e.target.dataset;
    //获取地区级别
    var level = item.level;
    //获取地区的adcode
    var adcode = item.adcode;

    //设置省份信息
    if(level == 'province'){
        //如果重新选择了省份则清空市和县的数据
        // if(adcode != areaData.province.adcode){
        //     areaData.city = '';
        //     areaData.district = '';
        // }
        areaData.province = item;
        areaData.areaListShow = false;
        query(adcode,that,function(res){
            areaData.city = res.data[0];
            query(areaData.city.adcode,that,function(res){
                areaData.district = res.data[0];
                //如果 区县 的数据为空则不显示
                if(areaData.district){
                    areaData.districtShow = true;
                }else{
                    areaData.districtShow = false;
                }
                that.setData({
                    areaData : areaData
                })
            })
        });  
    }
    //设置城市信息
    if(level == 'city'){
        //如果重新选择了城市则清空县的数据
        if(adcode != areaData.city.adcode){
            areaData.district = '';
        }
        areaData.city = item;
        areaData.areaListShow = false;
        query(areaData.city.adcode,that,function(res){
            areaData.district = res.data[0];
            //如果 区县 的数据为空则不显示
            if(areaData.district){
                areaData.districtShow = true;
            }else{
                areaData.districtShow = false;
            }
            that.setData({
                areaData : areaData
            })
        })
    }
    //设置县/镇信息
    if(level == 'district'){
        areaData.district = item;
        areaData.areaListShow = false;
        that.setData({
            areaData : areaData
        })
    } 
};
//获取以选择的省份信息
function getProvince(that,e){
    var areaData = that.data.areaData;
    var province = areaData.province;
    return province;
}
//获取以选择的城市信息
function getCity(that,e){
    var areaData = that.data.areaData;
    var city = areaData.city;
    return city;
}
//获取以选择的县/镇信息
function getDistrict(that,e){
    var areaData = that.data.areaData;
    var district = areaData.district;
    return district;
}

module.exports = {
    init: init,
    showArea : showArea,
    hideArea : hideArea,
    selectArea : selectArea,
    getProvince : getProvince,
    getCity : getCity,
    getDistrict : getDistrict
}