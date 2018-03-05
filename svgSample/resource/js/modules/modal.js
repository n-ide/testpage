
$(function(){
  $('.modal-open').click(function(){
    $('body').addClass('lock');
    $('.modal-overlay').fadeIn('slow');
    $('.modal-wrap').fadeIn('slow');
    var modal = '#' + $(this).attr('data-target');
    modalResize();
    $(modal).fadeIn('slow');
    $(modal).click(function(e){
        e.stopPropagation();
    });

    $('.modal-wrap, .modal-close').off().click(function(){
      $(modal).fadeOut('slow');
      $('html, body').removeClass('lock');
      $('.modal-overlay').fadeOut('slow');
      $('.modal-wrap').fadeOut('slow');
    });

    $(window).on('resize', function(){
      modalResize();
    });
    function modalResize(){
      var h = $(window).height();
      var mh = $(modal).outerHeight(true);
      if ((mh > h)) {
        $(modal).css({'top': 50 + 'px'});
      } else {
        var y = (h - mh) / 2;
        $(modal).css({'top': y + 'px'});
      }
    }
  });
});
