//var host = 'https://wxapi.hotapp.cn/api/districts?parent_adcode=420000';
var host = 'https://wxapi.hotapp.cn/api/districts';
//查询
function query(parent_adcode,cb){
    var area_id = '';

    //判断parent_adcode是不是function类型
    if((typeof parent_adcode == "function")){
        cb = parent_adcode;
    }else{
        area_id = parent_adcode;
    }

    wx.request({
        url: host, //仅为示例，并非真实的接口地址
        data: {
            parent_adcode: area_id 
        },
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
            typeof cb == "function" && cb(res.data)
        }
    })
}
module.exports = {
  query: query
}