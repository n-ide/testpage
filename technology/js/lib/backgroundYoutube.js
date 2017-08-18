// load yt iframe js api
var tag = document.createElement('script');
tag.src = "//www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


$(function() {
  (function ($, window) {
    // kill for mobile devices
    var deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    // defaults
    var defaults = {
      ratio: 16/9, // usually either 4/3 or 16/9 -- tweak as needed
      videoId: '0DS9PY6iaxE', // toy robot in space is a good default, no?
      mute: true,
      repeat: true,
      width: $(window).width(),
      // wrapperZIndex: 1,
      playButtonClass: 'tubular-play',
      pauseButtonClass: 'tubular-pause',
      muteButtonClass: 'tubular-mute',
      volumeUpClass: 'tubular-volume-up',
      volumeDownClass: 'tubular-volume-down',
      increaseVolumeBy: 10,
      start: 0,
      minimumSupportedWidth: 600
    };

    // methods

    var tubular = function(node, options) { // should be called on the wrapper div
      var options = $.extend({}, defaults, options),
        $body = $('#player') // cache body node
        $node = $(node); // cache wrapper node

      // build container
      var tubularContainer = '<div id="tubular-container" style="overflow: hidden; position: fixed; z-index: 0; width: 100%; height: 100%"><div id="tubular-player" style="position: absolute"></div></div><div id="tubular-shield" style="width: 100%; height: 100%; z-index: 2; position: absolute; left: 0; top: 0;"></div>';

      // set up css prereq's, inject tubular container and set up wrapper defaults
      $('#player').css({'width': '100%', 'height': '100%'});
      $body.prepend(tubularContainer);
      $node.css({position: 'relative', 'z-index': options.wrapperZIndex});

      // set up iframe player, use global scope so YT api can talk
      window.player;
      window.onYouTubeIframeAPIReady = function() {
        player = new YT.Player('tubular-player', {
          width: options.width,
          height: Math.ceil(options.width / options.ratio),
          videoId: options.videoId,
          playerVars: {
            controls: 0,
            showinfo: 0,
            modestbranding: 1,
            wmode: 'transparent'
          },
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      window.onPlayerReady = function(e) {
        resize();
        if (options.mute) e.target.mute();
        e.target.seekTo(options.start);
        e.target.playVideo();
      }

      window.onPlayerStateChange = function(state) {
        if (state.data === 0 && options.repeat) { // video ended and repeat option is set true
          player.seekTo(options.start); // restart
        }
      }

      // resize handler updates width, height and offset of player after resize/init
      var resize = function() {
        var width = $(window).width(),
          pWidth, // player width, to be defined
          height = $(window).height(),
          pHeight, // player height, tbd
          $tubularPlayer = $('#tubular-player');

        // when screen aspect ratio differs from video, video must center and underlay one dimension

        if (width / options.ratio < height) { // if new video height < window height (gap underneath)
          pWidth = Math.ceil(height * options.ratio); // get new player width
          $tubularPlayer.width(pWidth).height(height).css({left: (width - pWidth) / 2, top: 0}); // player width is greater, offset left; reset top
        } else { // new video width < window width (gap to right)
          pHeight = Math.ceil(width / options.ratio); // get new player height
          $tubularPlayer.width(width).height(pHeight).css({left: 0, top: (height - pHeight) / 2}); // player height is greater, offset top; reset left
        }

      }

      // events
      $(window).on('resize.tubular', function() {
        resize();
      })

      $('body').on('click','.' + options.playButtonClass, function(e) { // play button
        e.preventDefault();
        player.playVideo();
      }).on('click', '.' + options.pauseButtonClass, function(e) { // pause button
        e.preventDefault();
        player.pauseVideo();
      }).on('click', '.' + options.muteButtonClass, function(e) { // mute button
        e.preventDefault();
        (player.isMuted()) ? player.unMute() : player.mute();
      }).on('click', '.' + options.volumeDownClass, function(e) { // volume down button
        e.preventDefault();
        var currentVolume = player.getVolume();
        if (currentVolume < options.increaseVolumeBy) currentVolume = options.increaseVolumeBy;
        player.setVolume(currentVolume - options.increaseVolumeBy);
      }).on('click', '.' + options.volumeUpClass, function(e) { // volume up button
        e.preventDefault();
        if (player.isMuted()) player.unMute(); // if mute is on, unmute
        var currentVolume = player.getVolume();
        if (currentVolume > 100 - options.increaseVolumeBy) currentVolume = 100 - options.increaseVolumeBy;
        player.setVolume(currentVolume + options.increaseVolumeBy);
      })
    }

    // create plugin
    $.fn.tubular = function (options) {
      return this.each(function () {
        if (!$.data(this, 'tubular_instantiated')) {
          $.data(this, 'tubular_instantiated',
          tubular(this, options));
        }
      });
    }

  })(jQuery, window);

  $('body').tubular({
     videoId: '0DS9PY6iaxE'  // 埋め込みたいYoutubeのIDを記述します
  });
});

  // 各プレーヤーの格納
  var ytPlayera = [];
  // プレーヤーのサイズ
  var ytWidth = 640;
  var ytHeight = 390;
  // 各動画情報
  var ytData = [
    {
      id: 'VrwE9I1CJqw',
      area: 'youtube-1'
    }, {
      id: 'kDn_1MjvFXI',
      area: 'youtube-2'
    }, {
      id: '0DS9PY6iaxE',
      area: 'youtube-3'
    }
  ];

  // 各プレーヤーの埋め込み
  function onYouTubeIframeAPIReady() {
    for(var i = 0; i < ytData.length; i++) {
      ytPlayera[i] = new YT.Player(ytData[i]['area'], {
        width: ytWidth,
        height: ytHeight,
        videoId: ytData[i]['id'],
        playerVars: {
          rel: 0,
          controls: 0,
          showinfo: 0
        },
        events: {
          'onReady': onPlayerReady
        }
      });
    }
  }

  // 各プレーヤー準備完了後の処理
  function onPlayerReady(e) {
    e.target.setVolume(0);
    for (var i = 0; i < ytData.length; i++) {
      if(e.target.getIframe().id == ytData[i]['area']) {
        var elm = $(ytData[i]['area']);
        elm.onmouseover = function(){
          player.playVideo();
        }
        elm.onmouseout = function(){
          player.pauseVideo();
        }
        console.log('これは' + elm);
      }
    };
  }
