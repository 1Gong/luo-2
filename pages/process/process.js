// pages/process/process.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowWidth: '',
    windowHeight: '',
    imgwidth:'',
    imgheight:'',
    img:""
  },
  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let {windowWidth, windowHeight} = wx.getSystemInfoSync()
    this.setData({windowWidth, windowHeight})

    console.log("得到截取图path "+options.img);
    console.log("宽高 "+this.data.windowHeight+'--'+this.data.windowWidth);
    this.setData({
      img:options.img
    })

      


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  //画图
  const ctx = wx.createCanvasContext('canvas')
  ctx.drawImage(this.data.img, 0, 0, 402, 402)
  //按位置框选
  ctx.strokeRect(45, 20, 43, 60)
  //写字
  ctx.setFontSize(20)
  ctx.fillStyle = 'rgb(192, 80, 77)';
  ctx.fillText('first', 10,30)
  // ctx.draw()
  ctx.draw(false, () => {
    // console.log("ctx.draw");
    // API 1.9.0 获取图像数据
    wx.canvasGetImageData({
      canvasId: 'canvas',
      x: 80,
      y: 70,
      width: 40,
      height: 40,
      success(res) {
        var result = res;
        console.log(res.data.length)
        console.log(result.data)
        console.log("buf:" + [result.data.buffer]);

        // RGBA to RGB
        // var rgbData = new Uint8Array(res.width * res.height * 3);
        // let idx = 0;
        // for (let i = 0; i < res.data.length; i +=4) {
        //   rgbData[idx] = res.data[i];
        //   rgbData[idx + 1] = res.data[i + 1];
        //   rgbData[idx + 2] = res.data[i + 2];
        //   idx += 3;
        // }
        // callback(rgbData);
      },
      fail: e => {
        console.error(e);
      },
    })
  })

    var _this = this;  
    wx.getImageInfo({ 
      src: _this.data.img, 
      success: function (res) { 
        _this.setData({ 
          imgwidth:res.width, 
          imgheight:res.height, 
        }) 
      } 
    })
  }
})

