var postData = require('../../../data/posts-data.js')
Page({
  data: {
    isPlayingMusic: false
  },
  onLoad: function(option) {
    console.log('id', option.id)
    var postId = option.id || 1
    this.data.currentPostId = postId;
    this.setData({
      postData: postData.postList[postId]
    })

    var collected_object = wx.getStorageSync('collected_object')
    if (collected_object) {
      var p = collected_object[postId]
      this.setData({
        collected: p
      })
    } else {
      var collected_object = {};
      collected_object[postId] = false;
      wx.setStorageSync('collected_object', collected_object);
    }

  },
  onMusicTap: function() {
    this.setData({
      isPlayingMusic: !this.data.isPlayingMusic
    })

    console.log('this.data.isPlayingMusic', this.data.isPlayingMusic)
  },
  onCollectionTap: function() {
    console.log('onCollectionTap')
    this.changeCollectedAsy();
  },
  changeCollectedAsy: function() {
    var that = this;
    wx.getStorage({
      key: "collected_object",
      success: function(res) {
        var data = res.data;
        var p = data[that.data.currentPostId];
        data[that.data.currentPostId] = !p;
        // 收藏变成未收藏，未收藏变成收藏
        // 更新文章是否的缓存值
        wx.setStorageSync('collected_object', data);
        // 更新数据绑定变量，从而实现切换图片
        that.setData({
          collected: !p
        })
        that.showToast(!p);
      }
    })
  },
  showToast: function(c) {
    wx.showToast({
      title: c ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success"
    })
  },

})