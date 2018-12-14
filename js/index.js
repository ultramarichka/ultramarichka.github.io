(function($) { // Begin jQuery
  $(function() { // DOM ready
    // Toggle open and close nav styles on click
    $('#nav-toggle').click(function() {
      $('nav ul').slideToggle();
    });
    // Hamburger to X toggle
    document.querySelector('#nav-toggle').addEventListener('click', function() {
      this.classList.toggle('active');
    });

    var heightOfHome = $(window).height() -50; //-navbarHeight (or -footerHeight)
    $('.hminus50').css('min-height', heightOfHome);


    /*$('#fullpage').fullpage({
  		//options here
  		autoScrolling:true,
  		scrollHorizontally: true
  	});

  	//methods
  	$.fn.fullpage.setAllowScrolling(false);*/
    // FULL PAGE ON SCROLL
    /*
    var divs = $('.fullPageScroll');
    var dir = 'up'; // wheel scroll direction
    var div = 0; // current div
    $(document.body).on('DOMMouseScroll mousewheel', function (e) {
        if (e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) {
            dir = 'down';
        } else {
            dir = 'up';
        }
        // find currently visible div :
        div = -1;
        divs.each(function(i){
            if (div<0 && ($(this).offset().top >= $(window).scrollTop())) {
                div = i;
            }
        });
        if (dir == 'up' && div > 0) {
            div--;
        }
        if (dir == 'down' && div < divs.length) {
            div++;
        }
        //console.log(div, dir, divs.length);
        $('html,body').stop().animate({
            scrollTop: divs.eq(div).offset().top
        }, 200);
        return false;
    });
    $(window).resize(function () {
        $('html,body').scrollTop(divs.eq(div).offset().top);
    });*/

    /*BUBBLES*/
    function bubbles() {

      var min_bubble_size = 3, // Smallest possible bubble diameter (px)
          max_bubble_size = 12; // Maximum bubble blur amount (px)

      var bubbleCount = 10;

      // Create the bubbles
      for (var i = 0; i < bubbleCount; i++) {
        $('.bubbles').append('<div class="bubble-container"><div class="bubble"></div></div>');
      }

      // Now randomise the various bubble elements
      $('.bubbles').find('.bubble-container').each(function(){

        // Randomise the bubble positions (0 - 100%)
        var pos_rand = Math.floor(Math.random() * 101);

        // Randomise their size
        var size_rand = min_bubble_size + Math.floor(Math.random() * (max_bubble_size + 1));

        // Randomise the time they start rising (3-15s)
        var delay_rand = 3 + Math.floor(Math.random() * 15);

        // Randomise their speed (3-8s)
        var speed_rand = 3 + Math.floor(Math.random() * 9);

        // Cache the this selector
        var $this = $(this);

        // Apply the new styles
        $this.css({
          'left' : pos_rand + '%',

          '-webkit-animation-duration' : speed_rand + 's',
          '-moz-animation-duration' : speed_rand + 's',
          '-ms-animation-duration' : speed_rand + 's',
          'animation-duration' : speed_rand + 's',

          '-webkit-animation-delay' : delay_rand + 's',
          '-moz-animation-delay' : delay_rand + 's',
          '-ms-animation-delay' : delay_rand + 's',
          'animation-delay' : delay_rand + 's'
        });

        $this.children('.bubble').css({
          'width' : size_rand + 'px',
          'height' : size_rand + 'px'
        });

      });
    }

    bubbles();

    var flag = true;

    function showText(){
      if (!flag) {
        $("#hidden_text").css("display", "none");
        $("#about_show_text").html("Read more..");
        flag = true;
      } else {
        $("#hidden_text").css("display", "block");
        $("#about_show_text").html("Show less");
        flag = false;
      }

    }

    $("#about_show_text").click(showText);
  }); // end DOM ready
})(jQuery); // end jQuery
