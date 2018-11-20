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


    $('#fullpage').fullpage({
  		//options here
  		autoScrolling:true,
  		scrollHorizontally: true
  	});

  	//methods
  	$.fn.fullpage.setAllowScrolling(false);
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
  }); // end DOM ready
})(jQuery); // end jQuery
