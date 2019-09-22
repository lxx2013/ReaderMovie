const postList = require('../../data/posts-data.js').postList
Page({

  data: {
    swiperItems: postList.slice(-3)
  },
  onLoad: function () {
    this.setData({
      postList
    });
  },
  onPostTap(event){
    var postId = event.currentTarget.dataset.postid;
     console.log(`on post id is ${postId}`);
     console.log(event);
    wx.navigateTo({
      url: "./post-detail/post-detail?id=" + postId
    })
  },
  onSwiperTap(event){
    wx.navigateTo({
      url: "./post-detail/post-detail?id=" + event.target.dataset.postId
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('ready', this.postList)

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('show', this.postList)

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('pull', this.postList)

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('reachBottom', this.postList)

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})