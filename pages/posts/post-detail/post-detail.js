var postData = require('../../../data/posts-data.js')
Page({
  data: {
    postData:{},
    /** 是否在播放音乐 */
    isPlayingMusic: false,
    /** 是否收藏了该文章*/
    collected: false
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
    if (wx.getBackgroundAudioManager().paused === false){
      this.setData({ isPlayingMusic: true })
    }
  },
  onMusicTap: function() {
    try{
      var bgm = wx.getBackgroundAudioManager()
      if (!this.data.isPlayingMusic) {
        Object.assign(bgm, {
          src: 'https://i.setsuna.wang/SING%E5%A5%B3%E5%9B%A2%20-%20%E5%AF%84%E6%98%8E%E6%9C%88.mp3',
          title: '寄明月',
          coverImgUrl: 'https://eleme.setsuna.wang/touma2.jpg'
        })
      }else{
        bgm.pause()
      }
      this.setData({ isPlayingMusic: !this.data.isPlayingMusic })
    }catch(err){
      console.error(err)
    }
  },
  onCollectionTap: function() {
    console.log('onCollectionTap')
    let id = this.data.currentPostId
    let data = (wx.getStorageSync('collected_object') || {})
    // 询问是否要取消收藏
    if (data[id]) {
      wx.showModal({
        content: '真的要取消收藏吗?',
        showCancel: true,
        cancelText: 'cancel',
        confirmText: 'confirm',
        success: (res)=>{ res.confirm && this.changeCollectedAsync() }
      })
    } else {
      this.changeCollectedAsync()
    }
  },
  changeCollectedAsync: function() {
    let id = this.data.currentPostId
    let data = wx.getStorageSync('collected_object') || {}
    data[id] ^= 1;
    wx.setStorageSync('collected_object', data);
    this.setData({
      collected: data[id]
    })
    this.showToast(data[id]);
  },
  showToast: function(c) {
    wx.showToast({
      title: c ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success"
    })
  },
  onShareTap(e){
    wx.showActionSheet({
      itemList: "微信好友 朋友圈 QQ 微博".split(' ').map(x=>'分享到'+x),
      itemColor:'#405f80',
      success(res){
        console.log(res)
      }
    })
  }
})