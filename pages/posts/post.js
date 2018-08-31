Page({

  data: {
    //小程序总是会读取data对象来做数据绑定，这个动作我们称为动作A
    // 而这个动作A的执行，是在onLoad函数执行之后发生的
  },
  onLoad: function () {
    this.setData({
      postList: require('../../data/posts-data.js').postList
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