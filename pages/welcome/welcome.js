Page({
  onTap(e){
    wx.redirectTo({
      url: '../posts/post',
    })
    console.log(e)
  }
})