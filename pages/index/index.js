var app = getApp();
Page({
    data:{
        areaInfo:''
    },
    onShow:function(e){
        this.setData({
             areaInfo:app.globalData.areaInfo
        })
    }
})