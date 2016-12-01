/*
HotCity城市选择器由HotApp小程序统计团队开发并开源：https://github.com/hotapp888/hotcity
城市完整SQL下载地址和API接口文档说明：http://wenda.hotapp.cn/article/3
小程序交流学习QQ群173063969
*/
var app = getApp();
var hotapp = require('../../util/hotapp.js');
Page({
    data:'',
    onShow:function(event){
        hotapp.onEvent("index");
    }
})