(function($){ 
   $(document).ready(function() {
    $('.information_menu').find('li').hover(function(e) {
         $('.information_menu').find('li').removeClass('active');
        $(this).addClass('active');
        $(".overlay-item").removeClass("active");
        $(".overlay-item").removeClass("inactive");
		$(".overlay-id"+$(this).data("id")).addClass("active").removeClass("inactive");
        
         $(".overlay-id"+$(this).data("id")).prev().addClass("inactive")
    });     
	
    $('.slideshow').children().on('mouseleave',function(e) {
		$(this).removeClass("active");
	});    
    
    $('.carousel').carousel();
   });
})(jQuery);

 
