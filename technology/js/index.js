// 行の高さを揃える
$(function(){
  var columns = 2;
  var liLen = $('.h_adjust').length;
  var lineLen = Math.ceil(liLen / columns);
  var liHiArr = [];
  var lineHiArr = [];

  for (i = 0; i <= liLen; i++) {
    liHiArr[i] = $('.h_adjust').eq(i).height();
    if (lineHiArr.length <= Math.floor(i / columns)
      || lineHiArr[Math.floor(i / columns)] < liHiArr[i])
    {
      lineHiArr[Math.floor(i / columns)] = liHiArr[i];
    }
  }
  $('.h_adjust').each(function(i){
    $(this).css('height',lineHiArr[Math.floor(i / columns)] + 'px');
  });
});


//scrollでコンテンツ移動
$(function() {
  $.scrollify({
  section : ".section",
  sectionName : "section-name",
  });
  $(".scroll-btn").click(function(e) {
    e.preventDefault();
    $.scrollify.move("#vision");
    // $.scrollify.next();
  });
  $('a[href^="#"]').on("click",function() {
    $.scrollify.move($(this).attr("href"));
  });
});


//scrollボタン
$(function() {
  setTimeout(function(){
    $('.scroll-btn').addClass('is-active');
  },8000);
  $(window).scroll(function() {
    if ($(this).scrollTop() > 1) {
      $('.scroll-btn').removeClass('is-active');
    } else {
      $('.scroll-btn').addClass('is-active');
    }
  });
});


//header処理
$(function() {
  var Header = $('#header');
  var hchange = 300;
  $(window).scroll(function () {
    if ( $(window).scrollTop() > hchange ) {
      Header.addClass("is-active");
    } else if ( Header.hasClass("is-active") ) {
      Header.removeClass("is-active");
    }
  });
});


//header navigation処理
$(function() {
  $(window).scroll(function () {
    var globalNavListItem = $('#pageNav > ul > li');
    var currentListItem;
    var targetAreaElement;
    var targetArea;
    var targetAreaTop;
    var currentTargetArea;
    var scrollTop = $(window).scrollTop();

    globalNavListItem.each(function () {
      currentListItem = $(this);
      targetAreaElement = currentListItem.find('a').attr('href');
      targetArea = $(targetAreaElement);
      targetAreaTop = targetArea.offset().top - 120;

      if (targetAreaTop <= scrollTop && targetAreaTop + targetArea.height() + 120 > scrollTop) {
        if (currentTargetArea === targetAreaElement) {
          return;
        }

        currentTargetArea = targetAreaElement;

        globalNavListItem.removeClass('is-active');
        currentListItem.addClass('is-active');

        return;
      }
    });
  });
});


// footer処理
$(window).scroll(function() {
  scrollHeight = $(document).height();
  scrollPosition = $(window).height() + $(window).scrollTop();
  if ( (scrollHeight - scrollPosition) / scrollHeight <= 0.01) {
    $('#footer').addClass('is-active');
  } else {
    $('#footer').removeClass('is-active');
  }
});


// backgroundYoutube
$(function() {
  $('body').tubular({
    videoId: '0DS9PY6iaxE'
  });
});


// hero 文字処理
$(function() {
  var DELAY_SPEED = 50;//文字が流れる速さ
  var FADE_SPEED = 200;//表示のアニメーション時間
  var str = [];
  setTimeout(function(){
    $('.js-fade > span').each(function(i){//セレクタで指定した要素すべて
      $(this).css('opacity','1');//行を不透明にする
      str[i] = $(this).text();//元のテキストをコピーし
      $(this).text('');//テキストを消す
      var no = i;
      var self = this;
      var interval = setInterval(function(){//50ミリ秒毎にチェック
        if(no == 0 || $('.js-fade > span').eq(no - 1).children('span:last').css('opacity') == 1){//最初の行または前の行が全文字表示された時
          clearInterval(interval);//チェックを停止
          for (var j = 0; j < str[no].length; j++) {
            $(self).append('<span>'+str[no].substr(j, 1)+'</span>');
            $(self).children('span:last').delay(DELAY_SPEED * j).animate({opacity:'1'}, FADE_SPEED);
          }
        }
      }, 50);
    });
  },5000);
});


// modal
$(function(){
  $('.modal-open').click(function(){
    $('body').addClass('lock');
    $('.modal-overlay').fadeIn('slow');
    var modal = $('.modal-content');
    $(modal).wrap("<div class='modal-wrap'></div>");
    $('.modal-wrap').show();
    modalResize();
    $(modal).fadeIn('slow');
    $(modal).click(function(e){
        e.stopPropagation();
    });
    $('.modal-wrap, .modal-close').off().click(function(){
      $(modal).fadeOut('slow');
      $('.modal-wrap').fadeOut('slow',function(){
        $('body').removeClass('lock');
        $(modal).unwrap("<div class='modal-wrap'></div>");
     });
    });

    $(window).on('resize', function(){
      modalResize();
    });
    function modalResize(){
      var h = $(window).height();
      var mh = $(modal).outerHeight(true);
      // $(modal).css({'top': 50 + 'px'});
    }
  });
});


// modal slick
$(function(){
  var slider = $('.slider').slick({
    initialSlide: 0,
    arrows: false,
    adaptiveHeight: true,
    infinite: false
  });
  $('.modal-open').click(function(){
    var initialslide = $(this).attr('data-target') -1;
    slider.slick('slickGoTo', parseInt(initialslide, 10), true)
    slider.css('opacity',0);
    slider.animate({'z-index':1},300,function(){
      slider.slick('setPosition');
      slider.animate({'opacity':1});
    });
  });
});
