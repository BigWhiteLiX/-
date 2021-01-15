// js文件
// var sy;//记录手指的y坐标
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carouselList:[],
    navList:[],
    floordata:[],

  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCarouseData();
    this.getNavData();
    this.getFloorData();
  },
  // 获取轮播图数据
  getCarouseData() {
    const _this = this;
    wx.request({
      url: 'https://www.uinav.com/api/public/v1/home/swiperdata',
      success(res) {
        const {message} = res.data;
        // 因为返回参数和实际文件路径不一致，所以截取?号后的id重新赋值
        for (let i = 0; i < message.length; i++) {
          message[i].navigator_url =  message[i].navigator_url.split('?')[1]
        }
        _this.setData({
          carouselList:message
        })
      }
    });
  },
  // 获取导航栏数据
  getNavData() {
    const _this = this;
    wx.request({
      url: 'https://www.uinav.com/api/public/v1/home/catitems',
      success(res) {
        const {message} = res.data;
        _this.setData({
          navList:message
        })
      }
    });
  },
  // 获取商品楼层数据
  getFloorData(){
    const _this = this;
    wx.request({
      url: 'https://www.uinav.com/api/public/v1/home/floordata',
       success(res) {
        const {message} = res.data;
        _this.setData({
          floordata:message
        })
      }
    })
  },

 
})