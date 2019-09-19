Page({
  data: {
    obj:123
  },
  onLoad: function () {
    // you can use this way to modify a danamic data path
    var a = {b:1,d:3,e:4,f:5,g:6}
    const { e, ...rest} = a

    this.setData({
      'obj': JSON.stringify({c:2,...rest})
    })
  },
  onTap(e){
    wx.redirectTo({
      url: '../posts/post',
    })
    console.log(this.data)
  }
})