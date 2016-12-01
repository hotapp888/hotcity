/*
HotCity城市选择器由HotApp小程序统计团队开发并开源：https://github.com/hotapp888/hotcity
城市完整SQL下载地址和API接口文档说明：http://wenda.hotapp.cn/article/3
小程序交流学习QQ群173063969
*/
//app.js
var hotapp = require('util/hotapp.js');
App({
  onLaunch: function () {
    //一行代码接入HotApp小程序统
    //统计接入成功后 会自动统计 今日启动数 昨日启动数 今日新增用户 昨日新增用户  今日活跃 昨日活跃数 今日累计用户
    hotapp.init("hotapp22259962");
  }
})