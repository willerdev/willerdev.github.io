$(document).ready(function() {
	
	//Browser Specs
	//ie11
	if(navigator.userAgent.match(/Trident.*rv:11\./)) {
	    $('body').addClass('ie11');
	}
	
	//ie10
	var doc = document.documentElement;
	doc.setAttribute('data-useragent', navigator.userAgent);
	
	//android
	if(navigator != undefined && navigator.userAgent != undefined) {
        user_agent = navigator.userAgent.toLowerCase();
        if(user_agent.indexOf('android') > -1) { // Is Android.
            $(document.body).addClass('android');
        }
    }

    //chrome
    var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
	if (is_chrome) {
	    $('body').addClass('chrome');
	}
	
	//pc or windows
	if (navigator.appVersion.indexOf("Mac")!=-1) {
		$('body').addClass('mac');
	} else {
		$('body').addClass('pc');
	}


	$(".ie7 #main_nav").before('<div class="clear_R"></div>');
	$(".ie7 .new_row").before('<div class="clear_L"></div>');


	window.vertically_center = function(_item, fadein){
		if(fadein){
		/*setTimeout(function() {*/
			$( _item ).show();
			$( _item ).animate({ 'opacity':'0' , 'marginTop':'0' }, 0);
			$( _item ).animate({ 'opacity':'1' , 'marginTop': -($( _item ).outerHeight(false)/2) }, 1750, "easeOutQuad").addClass('vert_center');
		/*}, 1000);*/
		}
		else{
			$( _item ).css({ 'marginTop': -($( _item ).outerHeight(false)/2) });
		}
	}

	$(window).on('load resize',function(){
		$( ".vert_center" ).each(function() {
			vertically_center($(this),false);
		});
	});

	/* smooth scrolling */
	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html,body').animate({
				scrollTop: target.offset().top
			}, 750);
			return false;
			}
		}
	});



});


//Window onLoad
$(window).load(function() {

	if($(window).width() > 480 && !$("body").hasClass('home')){
		vertically_center( $( ".header_txt" ), true );
	}

});
