# hotCity 城市选择器， 城市数据库可自己导出
##后台数据API 由HotApp小程序统计提供并维护，如果需要导出并部署在公司的生产环境，最后有SQL导出下载地址
## 使用方法

- 复制pages/district到你的项目目录

- 把样式文件district.wxss引入到您调用本插件的作用域
`@import "你的路径/district/wxParse.wxss";`

- 在需要使用的模版的x.wxml中引入模版文件wxParse.wxml
```javascript
<import src="../district/district.wxml"/>
<template is="district" data="{{districts}}" />
```

- 在对应的js中引入district.js文件
`var WxParse = require('你的路径/district/district.js');`

- 使用:
在你的js文件中, 必须要绑定四个事件:  
getProvinces、getCities、getDistricts和finish  
其中  
getProvinces事件需要调用districts.getProvinces(this);  
getCities事件需要调用districts.getCities(this, event);  
getDistricts事件需要调用districts.getDistricts(this, event);  
finish事件需要调用districts.finish(this, event);  

## 应用截图
![首页](https://github.com/hotapp888/hotcity/blob/master/screenshots/1.png)
###样式一 通过导航实现三级选择
![首页](https://github.com/hotapp888/hotcity/blob/master/screenshots/2.png)
![首页](https://github.com/hotapp888/hotcity/blob/master/screenshots/3.png)
![首页](https://github.com/hotapp888/hotcity/blob/master/screenshots/4.png)
###样式二 三级联动
![首页](https://github.com/hotapp888/hotcity/blob/master/screenshots/5.png)
![首页](https://github.com/hotapp888/hotcity/blob/master/screenshots/6.png)
![首页](https://github.com/hotapp888/hotcity/blob/master/screenshots/7.png)

## 统计截图 通过接入hotApp的统计，可知道大家喜欢那个城市选择器
![首页](https://github.com/hotapp888/hotcity/blob/master/screenshots/01.png)


## 数据来源

数据来源于高德地图, 从高德地图的行政区划查询中找到了api请求地址, 然后再写脚本把高德所有的数据全部导入到hotapp的数据库中

## 数据库表设计

高德地图返回的数据格式是:

```json
{
  	adcode: "220100"
	center: "125.3245,43.886841"
	citycode: "0431"
	districts: []
	level: "city"
	name: "长春市"
}
```

我稍微改造了一下, 数据库字段设计为:

```sql
CREATE TABLE `tbl_districts` (
  `adcode` char(6) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `lng` decimal(12,8) unsigned NOT NULL,
  `lat` decimal(12,8) unsigned NOT NULL,
  `level` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `parent_adcode` char(6) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`adcode`),
  KEY `tbl_districts_parent_adcode_index` (`parent_adcode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
```
其中, lng表示经度, lat表示纬度, level有"province"、"city"和"district"三种类型


## 接口使用方法

一共就一个接口: `GET /districts`, 如果不带参数, 表示获取的是所有province级别的数据, 如果带上参数parent_adcode, 表示获取指定的parent_adcode的数据. 

比如: 要获取所有province级别的数据: `GET https://wxapi.hotapp.cn/api/districts` , 返回格式为:

```json
[
  {
    "adcode": 110000,
    "name": "北京市",
    "lng": "116.40528500",
    "lat": "39.90498900",
    "level": "province",
    "parent_adcode": ""
  },
  {
    "adcode": 120000,
    "name": "天津市",
    "lng": "117.19018200",
    "lat": "39.12559600",
    "level": "province",
    "parent_adcode": ""
  },
  ...
    {
    "adcode": 420000,
    "name": "湖北省",
    "lng": "114.29857200",
    "lat": "30.58435500",
    "level": "province",
    "parent_adcode": ""
  },
  ...
]
```

然后如果需要获取湖北省所有的city, 那么调用`GET https://wxapi.hotapp.cn/api/districts?parent_adcode=420000`, 返回格式为:

```json
[
  {
    "adcode": 420100,
    "name": "武汉市",
    "lng": "114.29857200",
    "lat": "30.58435500",
    "level": "city",
    "parent_adcode": "420000"
  },
  {
    "adcode": 420700,
    "name": "鄂州市",
    "lng": "114.89059300",
    "lat": "30.39653600",
    "level": "city",
    "parent_adcode": "420000"
  },
  {
    "adcode": 420800,
    "name": "荆门市",
    "lng": "112.20425100",
    "lat": "31.03542000",
    "level": "city",
    "parent_adcode": "420000"
  },
  ...
]
```

然后想要再获取武汉市所有的区, 那么就调用`GET https://wxapi.hotapp.cn/api/districts?parent_adcode=420100`, 返回格式为:

```json
[
  {
    "adcode": 420102,
    "name": "江岸区",
    "lng": "114.30304000",
    "lat": "30.59491100",
    "level": "district",
    "parent_adcode": "420100"
  },
  {
    "adcode": 420103,
    "name": "江汉区",
    "lng": "114.28310900",
    "lat": "30.57877100",
    "level": "district",
    "parent_adcode": "420100"
  },
  ...
]
```

另外, 考虑到有些用户可能以后会自己开发后台, 所以也提供了数据库导出接口, 在这里 http://wenda.hotapp.cn/article/3, 这个会导出我们的数据库表接口和所有数据!

--------

hot云笔记小程序 云端存储记事的开源小程序
https://github.com/hotapp888/hotapp-notepad

