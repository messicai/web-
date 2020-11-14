let app = new Vue({
    el: "#app",
    data: {
        query: "",
        musicList: [],
        musicUrl: "",
        musicCover: "img/7-1Z603113ZN00.jpg",
        isPlaying: false,
        userList: [],
        mvUrl: "",
        mvJudge: false,
        mvStatus: true, //播放按钮的暂停与播放样式转换
        mv_btn: true, //判断鼠标是否进入mv，使播放按钮出现或消失
    },
    methods: {
        searchMusic: function() {
            let that = this
            axios.get(`https://autumnfish.cn/search?keywords=${this.query}`).then(function(response) {
                console.log(response);
                console.log(response.data.result.songs);
                that.musicList = response.data.result.songs
            }, function(err) {
                alert('错误404')
            })
        },
        playMusic: function(musicId) {
            console.log(musicId);
            let that = this
                //获取歌曲地址
            axios.get(`https://autumnfish.cn/song/url?id=${musicId}`).then(function(response) {
                console.log(response);
                that.musicUrl = response.data.data[0].url
            }, function(err) {
                alert('歌曲加载错误')
            })

            //歌曲详情获取
            axios.get(`https://autumnfish.cn/song/detail?ids=${musicId}`).then(function(response) {
                console.log(response.data.songs[0].al.picUrl);
                console.log(response);
                that.musicCover = response.data.songs[0].al.picUrl
            }, function(err) {
                alert(`图片加载错误`)
            })

            //歌曲评论获取
            axios.get(`https://autumnfish.cn/comment/hot?type=0&id=${musicId}`).then(function(response) {
                console.log(response.data.hotComments);
                that.userList = response.data.hotComments
            }, function(err) {
                alert('评论获取失败')
            })
        },
        playMv(mvid) {
            let that = this
            axios.get(`https://autumnfish.cn/mv/url?id=${mvid}`).then(function(response) {
                console.log(response);
                console.log(response.data.data.url);
                that.mvUrl = response.data.data.url
                that.mvJudge = true
            }, function(err) {
                alert("影片加载错误")
            })
        },
        closeMv() {
            this.mvJudge = false
            this.$refs.audio.play()
        },
        controlMusic() {
            if (this.isPlaying) {
                this.$refs.audio.pause()
            } else {
                this.$refs.audio.play()
            }

        },
        //当mv播放的时候，音乐暂停
        mvPlay() {
            this.$refs.audio.pause()
            this.mvStatus = true
        },
        mvPause() {
            this.mvStatus = false
        },
        // 当鼠标移进mv页面
        mvIn() {
            this.mv_btn = true
        },
        mvOut() {
            this.mv_btn = false
        },
        //当点击播放按钮
        click_mv_btn() {
            if (this.mvStatus) {
                this.$refs.video.pause()
            } else {
                this.$refs.video.play()
            }
        },

        //监听音乐播放状态
        play: function() {
            console.log("play");
            this.isPlaying = true
        },
        pause: function() {
            console.log("pause");
            this.isPlaying = false
        }
    },
})