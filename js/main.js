// some scripts
"use strict";
$(document).ready(function(){


  $(document).on('click', '.header .menu li a', function(e){
      e.preventDefault();
      var $anchor = $(this).attr('href');
      $('html, body').stop().animate({ scrollTop: $($anchor).offset().top - 20  }, 1000);
  });

  
  function block_height(argument) {
    var mh = 0;
    $(argument).each(function () {
      var height_block = $(this).height();
      if (height_block > mh) {
        mh = height_block;
      }
    });
    $(argument).height(mh);
  }
  block_height($('#intro .container .intro_slick h1'));
  if ($(window).width() > 992) {
    block_height($('#timer .col-md-10 .col-md-6'));
  }


  $('.intro_slick').slick({
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    fade: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    cssEase: 'linear'
  });

  $('#apartment_selection .slider').slick({
    arrows: true,
    dots: true,
    adaptiveHeight: true,
    swipe: false,
    infinite: true,
    speed: 500
  });


  $(document).on('click', '.burger', function(){
    $('#wrapper').toggleClass('menu_active');
  });
  $(document).on('click', '.menu_active .header .menu ul li a', function(){
    $('#wrapper').toggleClass('menu_active');
  });


  $(document).on('click', '#apartment_selection .slider_buttons > div > button', function(){
      $('#apartment_selection .slider_buttons > div > button').each(function(){$(this).removeClass('active')});
      
      if ($(this)[0].classList[0].length > 6) {
        var cls = $(this)[0].classList[0].toString(),
            num = Number(cls[cls.length - 1] - 1);
        $('#apartment_selection .slider_wrapper .slider .slick-dots li').eq(num)[0].click();
        $(this).addClass('active');
        $('.btn_views').each(function(){$(this).removeClass('active')});
      }else{
        $('.btn_views').each(function(){$(this).removeClass('active')});
        $('.btn_views.'+$(this).attr('class')).addClass('active').find('button:eq(0)')[0].click();
        $(this).addClass('active');
      }
  });

  $(document).on('click', '#apartment_selection .slider_buttons .btn_views button', function(){
    $('#apartment_selection .slider_buttons .btn_views button').each(function(){$(this).removeClass('active')});
      var cls = $(this)[0].classList[0].toString(),
          num = Number(cls[cls.length - 1] - 1);
      $('#apartment_selection .slider_wrapper .slider .slick-dots li').eq(num)[0].click();
      $(this).addClass('active');
  });

  $(document).on('click', '.slick-arrow', function(){
    setTimeout(function(){
      $('#apartment_selection .slider_buttons button').each(function(){$(this).removeClass('active')});
      $('.btn_views').each(function(){$(this).removeClass('active')});
      var n = $('.slick-dots li.slick-active').index() + 1,
          t = $('#apartment_selection .slider_buttons button.slider_button'+n);
      t.addClass('active');
      if(t.parents('.btn_views').length) {$('.'+t.parents('.btn_views')[0].classList[1]).addClass('active')}
    }, 150);
  });

  // $(document).on('click', '.subscribe', function(){
  //   $(this).addClass('active');
  //   $('.subscribe_form').addClass('active');
  // })


	AOS.init({
    disable: 'mobile'
  });




  $('.select').on('click','.placeholder',function(){
  var parent = $(this).closest('.select');
  if ( ! parent.hasClass('is-open')){
    parent.addClass('is-open');
    $('.select.is-open').not(parent).removeClass('is-open');
  }else{
    parent.removeClass('is-open');
  }
  }).on('click','ul>li',function(){
    var parent = $(this).closest('.select');
    parent.removeClass('is-open').find('.placeholder').text( $(this).text() );
    $(this).addClass('active').siblings('li').removeClass('active');
  });








  // DECREMENT TIMER
  function initializeTimer(self) {

    var n_year = parseInt($(self).find('.time_year').html()),
        n_mounth = parseInt($(self).find('.time_mounth').html()) - 1,
        n_date = parseInt($(self).find('.time_date').html()),
        n_hour = (parseInt($(self).find('.time_hours').html()) > 0) ? parseInt($(self).find('.time_hours').html()) : 0,
        n_minutes = (parseInt($(self).find('.time_minutes').html()) > 0) ? parseInt($(self).find('.time_minutes').html()) : 0;

    var endDate = new Date(n_year,n_mounth,n_date,n_hour,n_minutes); // получаем дату истечения таймера
    var currentDate = new Date(); // получаем текущую дату
    var seconds = (endDate-currentDate) / 1000; // определяем количество секунд до истечения таймера

    if (seconds > 0) { // проверка - истекла ли дата обратного отсчета
      var minutes = seconds/60; // определяем количество минут до истечения таймера
      var hours = minutes/60; // определяем количество часов до истечения таймера
      var date = hours/24; // определяем количество дней до истечения таймера
      minutes = (hours - Math.floor(hours)) * 60; // подсчитываем кол-во оставшихся минут в текущем часе
      date = Math.floor(date); // целое количество дней до истечения таймера
      hours = Math.floor(hours) - Math.floor(date) * 24; // целое количество часов до истечения таймера
      seconds = Math.floor((minutes - Math.floor(minutes)) * 60); // подсчитываем кол-во оставшихся секунд в текущей минуте
      minutes = Math.floor(minutes); // округляем до целого кол-во оставшихся минут в текущем часе
      
      setTimePage(date,hours,minutes,seconds); // выставляем начальные значения таймера
      
      function secOut() {
        if (seconds == 0) { // если секунду закончились то
          if (minutes == 0) { // если минуты закончились то
            if (hours == 0) { // если часы закончились то
              if (date == 0) {
                //showMessage(timerId); // выводим сообщение об окончании отсчета 
                end_time(self);
              }
              else{
                date--;
                hours = 23; // обновляем часЫ
                minutes = 59; // обновляем минуты 
                seconds = 59; // обновляем секунды
              }
            }
            else {
              hours--; // уменьшаем кол-во часов
              minutes = 59; // обновляем минуты 
              seconds = 59; // обновляем секунды
            }
          }
          else {
            minutes--; // уменьшаем кол-во минут
            seconds = 59; // обновляем секунды
          }
        }
        else {
          seconds--; // уменьшаем кол-во секунд
        }
        setTimePage(date,hours,minutes,seconds); // обновляем значения таймера на странице
        // self.toggleClass('sec')
      }
      setInterval(secOut, 1000) // устанавливаем вызов функции через каждую секунду
    }
    else{
      end_time(self);
    }

    function setTimePage(d,h,m,s) { // функция выставления таймера на странице
      self.find('.public_date span').html(d);
      self.find('.public_hours span').html(h);
      self.find('.public_minutes span').html(m);
      self.find('.public_seconds span').html(s);
    }
    function end_time(t){
      t.html('<p>Окончились</p>')
    }

  }

  
  initializeTimer($('.decrement_timer'));
  // DECREMENT TIMER END


  $(document).on('click', '#apartment_selection .slider_wrapper .slider .slick-slide .col-md-1 a', function(e){
    e.preventDefault();
    $(this).addClass('active').siblings('a').removeClass('active');
    $(this).parent('.col-md-1').parent('.row').find('.'+$(this).attr('href')).addClass('active').siblings('img').removeClass('active');
  });




  $(document).on('click', '#intro .container .intro_slick a.night, #intro .container .intro_slick a.storm, #intro .container .intro_slick a.day', function(e){
    e.preventDefault();
    if($(this).hasClass('day')){ $('#intro').removeClass('night_storm night_anime').toggleClass('day_anime') }
    if($(this).hasClass('night')){ $('#intro').removeClass('night_storm day_anime').toggleClass('night_anime') }
    if($(this).hasClass('storm')){ $('#intro').removeClass('night_anime day_anime').toggleClass('night_storm') }
  });





  function randNumber(max, min){
    var number = Math.floor(Math.random() * max) - min
    return number
  };
  function setImg(){
    var lightningImages = ['img/intro_anime/lightning1.png', 'img/intro_anime/lightning2.png', 'img/intro_anime/lightning3.png']

    var randImg = randNumber(3, 0)
    return lightningImages[randImg]
  }
  function randomStrike(){
    var randImg = setImg()
    var randPosition = randNumber(80, 30)
    var randDeg = randNumber(60, 30)
    $('.lightning').css('background-image', 'url(' + randImg + ')')
    $('.lightning').css({
     'left' : randPosition + '%',
     'transform': 'rotate(' + randDeg + 'deg)'
    });
  }
  setInterval(function(){ 
    randomStrike()
  }, 3000);




















  function forFixedScroll(obj){
    if ($(document).scrollTop() > $('#intro').height()) {
      obj.addClass('fixed_active');
    }else{
      obj.removeClass('fixed_active');
    }
  };
  $(document).scroll(function(){
    forFixedScroll($('#header'));
  });





 //open popup
  $('.popup-trigger').on('click', function(event){
    event.preventDefault();
    var anchor = $(this).attr('href');
    $('body').addClass('scroll_none');
    $(anchor+'.popup').addClass('is-visible');
  });
  //close popup
  $('.popup').on('click', function(event){
    if( $(event.target).is('.popup-close') || $(event.target).is('.popup') ) {
      event.preventDefault();
      $(this).removeClass('is-visible');
      $('body').removeClass('scroll_none');
    }
  });
  //close popup when clicking the esc keyboard button
  $(document).keyup(function(event){
      if(event.which=='27'){
        $('.popup').removeClass('is-visible');
      }
  });




  // CONTACT FORM
  $('.phone').keydown(function (e) {
      var key = e.charCode || e.keyCode || 0;
      var $phone = $(this);

      // Auto-format- do not expose the mask as the user begins to type
      if (key !== 8 && key !== 9) {
          if ($phone.val().length === 0 || $phone.val().length === 1 || $phone.val().length === 2 || $phone.val().length === 3) {
              $phone.val('');
              $phone.val($phone.val() + '+998');
          }
          if ($phone.val().length === 4) {
              $phone.val($phone.val() + ' (');
          }
          if ($phone.val().length === 8) {
              $phone.val($phone.val() + ') ');
          }
          if ($phone.val().length === 13) {
              $phone.val($phone.val() + '-');
          }
          if ($phone.val().length === 16) {
              $phone.val($phone.val() + '-');
          }
          if ($phone.val().length === 19) {
              return false
          }
      }

      // Allow numeric (and tab, backspace, delete) keys only
      return (key == 8 ||
      key == 9 ||
      key == 46 ||
      (key >= 48 && key <= 57) ||
      (key >= 96 && key <= 105));
  })
  .bind('focus click', function () {
      var $phone = $(this);

      if ($phone.val().length === 0) {
          $phone.val('+998');
      }
      else {
          var val = $phone.val();
          $phone.val('').val(val); // Ensure cursor remains at the end
      }
  });


});
$(window).on('load', function(){
  function block_height(argument) {
    var mh = 0;
    $(argument).each(function () {
      var height_block = $(this).height();
      if (height_block > mh) {
        mh = height_block;
      }
    });
    $(argument).height(mh);
  }

  block_height($('#characteristics .article'));
});