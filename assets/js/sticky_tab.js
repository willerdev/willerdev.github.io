$(function(){

	function getScrollTop(){
		if(typeof pageYOffset != 'undefined'){
			//most browsers
			return pageYOffset;
		}
		else{
			var B= document.body; //IE 'quirks'
			var D= document.documentElement; //IE with doctype
			D= (D.clientHeight)? D: B;
			return D.scrollTop;
		}
	}

	var navH;
	/*
	$(window).on('load resize',function(){
		if( $('#res_widget').css('position') == "absolute"){
			navH = $('#nav').outerHeight(true);
			$('#res_widget').css({'top':navH});
		}
	});

	$(window).scroll(function() {
		if ( (getScrollTop() > navH) && ($(window).width() > 480) ){
			$('#res_widget').css({'position':'fixed'});
			$('#res_widget').css({'top':0});
		}
		else {
			$('#res_widget').css({'position':'absolute'});
			$('#res_widget').css({'top':navH});
		}
	});
	*/
	$(window).on('load resize',function(){
		navH = $('#breadcrumb_holder').offset()['top'] + $('#breadcrumb_holder').outerHeight(true);
		if ( (getScrollTop() > navH) && ($(window).width() > 480) ){
			$('#side_img').css({'position':'fixed','top':0});
		}
		else {
			$('#side_img').css({'position':'absolute','top':'auto'});
		}
	});

	$(window).scroll(function() {
		if ( (getScrollTop() > navH) && ($(window).width() > 480) ){
			$('#side_img').css({'position':'fixed','top':0});
		}
		else {
			$('#side_img').css({'position':'absolute','top':'auto'});
		}
	});

});