$(function () {
//歌曲列表1
var musics = [
    {path:'mp3/宋冬野 - 斑马,斑马.mp3',name:'斑马,斑马',artistan:'宋冬野',duration:'04:13',src:'img/banma.jpg'},
    {path:'mp3/宋冬野 - 莉莉安.mp3',name:'莉莉安',artistan:'宋冬野',duration:'04:13',src:'img/lilian.jpg'},
    {path:'mp3/庄心妍 - 走着走着就散了.mp3',name:'走着走着就散了',artistan:'庄心妍',duration:'04:28',src:'img/zouzhe.jpg'},
    {path:'mp3/张赫宣 - 我们不该这样的.mp3',name:'我们不该这样的',artistan:'张赫宣',duration:'03:46',src:'img/women.jpg'},
    {path:'mp3/薛之谦 - 丑八怪.mp3',name:'丑八怪',artistan:'薛之谦',duration:'04:13',src:'img/choubaguai.jpg'},
    {path:'mp3/薛之谦 - 你还要我怎样.mp3',name:'你还要我怎样',artistan:'薛之谦',duration:'05:03',src:'img/nihaiyao.jpg'},
    {path:'mp3/薛之谦 - 演员.mp3',name:'演员',artistan:'薛之谦',duration:'04:21',src:'img/yanyuan.jpg'},
    {path:'mp3/陈楚生 - 有没有人告诉你.mp3',name:'有没有人告诉你',artistan:'陈楚生',duration:'05:43',src:'img/youmeiyou.jpg'}
];
//把歌曲遍历到歌曲列表1中
    function dawlist() {
        $('.list1').empty();
        $.each(musics,function (i,v) {
            if(i === index){
                $('<li><span1>'+v.name+'</span1><span2>'+v.artistan+'</span2><span3>'+v.duration+'</span3><span4><samp1></samp1><samp2></samp2><samp3></samp3><samp4></samp4></span4></li>').addClass('active').appendTo('.list1');
            }else{
                $('<li><span1>'+v.name+'</span1><span2>'+v.artistan+'</span2><span3>'+v.duration+'</span3><span4><samp1></samp1><samp2></samp2><samp3></samp3><samp4></samp4></span4></li>').appendTo('.list1');
            }
        });
    }
    dawlist();

//获取一系列对象
    var audios = $('#audio');
    var audio = $('audio').get(0);
    var play = $('.music .controler .control .play');
    var prev = $('.music .controler .control .prev');
    var next = $('.music .controler .control .next');
    var index = 0;
    var currentIndex = 0;

// 播放按钮
    play.on('click',function(){
        if(audio.paused){
            audio.play();
        }else{
            audio.pause();
        };
	});

    audios.on('play',function(){
        play.addClass('pause');
    });
    audios.on('pause',function(){
        play.removeClass('pause');
	});

// 在播放时调用时间函数
    audio.onplay = function(){
        $(this).triggerHandler('timeupdate');
    };

//上下首切歌
    next.on('click',function(){
        currentIndex ++;
        if(currentIndex>musics.length-1){
            currentIndex = 0;
        }
        audio.src = musics[currentIndex].path;
        dawlist();
        audio.play();
    });
    prev.on('click',function(){
        currentIndex --;
        if(currentIndex<0){
            currentIndex=musics.length-1;
        }
        dawlist();
        audio.src=musics[currentIndex].path;
        audio.play();
    });

//播放列表点歌
    $('.music-list').on('click',"li",function () {
        currentIndex = $(this).index();
        audio.src = musics[currentIndex].path;
        dawlist();
        audio.play();
    });

//歌词列表
    $('.music .controler .info .info-lyric').on('click',function () {
        $(this).addClass('active');
        $('.music .list .list1').css('display','none');
        $('.music .list .list2').css('display','block');
        $('.music .controler .info .info-list').removeClass('active');
    });
    $('.music .controler .info .info-list').on('click',function () {
        $(this).addClass('active');
        $('.music .list .list2').css('display','none');
        $('.music .list .list1').css('display','block');
        $('.music .controler .info .info-lyric').removeClass('active');
    });

//歌词滚动
    $(function() {
        var $this = $("#box");
        var scrollTimer;
        scrollTimer = setInterval(function() {
            scrollNews($this);
        },3000);

        function scrollNews(obj) {
            var $self = obj.find("ul");
            var lineHeight = $self.find("li:first").height();
            $self.find("li").each(function () {
                $(this).css('color','#ffffff');
            });
            $self.find("li").eq(5).css('color','#0CC65B');
            $self.animate({
                "marginTop": -lineHeight + "px"
            },500, function() {
                $self.css({
                    marginTop: 0
                }).find("li:first").appendTo($self);
            });
        }

    });

//鼠标移到播放列表上的效果
    $('.music-list').on('mouseenter','li',function () {
        $(this).find('span3').css('display','none');
        $(this).find('span4').css('display','block');
    });
    $('.music-list').on('mouseleave','li',function () {
        $(this).find('span3').css('display','inline-block');
        $(this).find('span4').css('display','none');
    });

//删除列表上的歌曲
    $('.music-list li span4 samp2').on('click',function (e) {
       $(this).closest('li').remove();
        e.stopPropagation();
    });

//处理列表界面
    audios.on('play',function () {
        $('.music-list li').removeClass('active');
        $('.music-list li').eq(currentIndex).addClass('active');
        $('.music .controler .info .info-name').text(musics[currentIndex].name);
        $('.music .controler .control .alltime').text(musics[currentIndex].duration);
        $('.music .controler .star').css('background-image','url('+musics[currentIndex].src+')');

    });

//时间条
    var time = $('.music .controler .control .time');
    var Nowtime = $('.music .controler .control .time .nowtime');
    var Alltime = $('.music .controler .control .time .alltime');
    var timeRegulate = $('.music .controler .control .time .time-regulate');
    var timeBar = $('.music .controler .control .time .time-regulate .time-bar');
    var timeOp= $('.music .controler .control .time .time-regulate .time-op');

//获取时间函数
    function getTime(time){
        if(isNaN(time)){
            return '--:--';
        };
        var min=Math.floor(time/60);
        var sec=parseInt(time%60);
        if(sec<10){
            sec='0'+sec
        }
        if(min<10){
            min='0'+min
        }
        return min+':'+sec;
    };

//进度条
    audio.ontimeupdate=function () {
        Nowtime.text(getTime(audio.currentTime));
        timeOp.css({left:timeRegulate.width()*(audio.currentTime/audio.duration)});
        timeOp.on('click',false);
    };

    timeRegulate.on('click',function (e) {
        audio.currentTime = parseInt(audio.duration*(e.offsetX+timeOp.width()/2+4)/timeRegulate.width());
        console.dir(audio.currentTime)
        audio.ontimeupdate=function () {
            Nowtime.text(getTime(audio.currentTime));
            timeBar.css({width:timeRegulate.width()*(audio.currentTime/audio.duration)});
            timeOp.css({left:timeRegulate.width()*(audio.currentTime/audio.duration)-timeOp.width()/2});
        };
    });
//拖动进度条
    timeOp.on('mousedown',function(e){
        e.preventDefault();
        $(document).on('mousemove',function(e){
            var ww=(e.pageX-timeOp.offsetX)/timeRegulate.width()*audio.duration;
            ww=ww>=audio.duration?audio.duration:ww;
            ww=ww<=0?0:ww;
            audio.currentTime=ww;
        });
        $(document).on('mouseup',function(){
            $(document).off('mousemove');
            $(document).off('mouseup');
        });
    });


//音量条
    var volume = $('.music .controler .control .volume');
    var volumeMute = $('.music .controler .control .volume .volume-mute');
    var volumeRegulate = $('.music .controler .control .volume .volume-regulate');
    var volumeBar = $('.music .controler .control .volume .volume-regulate .volume-bar');
    var volumeOp = $('.music .controler .control .volume .volume-regulate .volume-op');

    volumeMute.on("click",function () {
       audio.volume = 0;
        $(this).toggleClass('volume0');
    });
    volumeRegulate.on('click',function (e) {
        audio.volume = (e.offsetX-volumeOp.width()/2+3)/volumeRegulate.width();
    });
    volumeOp.on("click",false);
    audios.on('volumechange',function () {
        volumeBar.css({width:volumeRegulate.width()*audio.volume});
        volumeOp.css({left:volumeRegulate.width()*audio.volume-volumeOp.width()/2});
    });
//拖动音量条
    volumeOp.on('mousedown',function(e){
        e.preventDefault();
        $(document).on('mousemove',function(e){
            var v= parseFloat((e.pageX-volumeOp.offsetX)/volumeRegulate.width());
            v=(v>1)?1:v;
            v=(v<0)?0:v;
            audio.volume=v;
        });
        $(document).on('mouseup',function(){
            $(document).off('mousemove');
        });

    });

//循环播放模式
    $('.music .controler .control .cyclee').on('mouseenter',function () {
        $(this).siblings('.cyclee').css('display','block');
    });
    // $('.music .controler .control .cyclee').on('mouseleave',function () {
    //     $(this).siblings('.cyclee').css('display','none');
    // });
    $('.music .controler .control .cycle').on('click',function () {
        $(this).siblings('.cycleee').removeClass('cycleee').css('top',$(this).css('top'));
        $(this).addClass('cycleee').css('display','block').css('top','10px');
        $(this).siblings('.cyclee').css('display','none');
    });
    $('.music .controler .control .cycle1').on('click',function () {
        $(this).siblings('.cycleee').removeClass('cycleee').css('top',$(this).css('top'));
        $(this).addClass('cycleee').css('display','block').css('top','10px');
        $(this).siblings('.cyclee').css('display','none');
    });
    $('.music .controler .control .cycle2').on('click',function () {
        $(this).siblings('.cycleee').removeClass('cycleee').css('top',$(this).css('top'));
        $(this).addClass('cycleee').css('display','block').css('top','10px');
        $(this).siblings('.cyclee').css('display','none');
    });
    $('.music .controler .control .cycle3').on('click',function () {
        $(this).siblings('.cycleee').removeClass('cycleee').css('top',$(this).css('top'));
        $(this).addClass('cycleee').css('display','block').css('top','10px');
        $(this).siblings('.cyclee').css('display','none');
    });

//闪屏开始
    $('.screen .img3').on('click',function () {
        $(this).parent().css('display','none');
    });
//闪屏结束

//歌曲列表切换开始
    $('.music .nav').on('click','.nav-item',function () {
        $('.music .nav .nav-item').css("opacity",0.8);
        $(this).css("opacity",1);
        $('.music .list .music-list').css('opacity',0);
        $(this).closest('.music').find('.list .music-list').index($(this).index()).css('opacity',1);
    });
//歌曲列表切换结束

});
