function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}

$(function(){

	window.fbAsyncInit = function() {
		FB.init({
			appId      : '1514584638812466',
			channelUrl : '../includes/channel.php.html',
			xfbml      : true,
			status     : true,
			version    : 'v2.2'
		});
	};
	
	(function(d, s, id){
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {return;}
		js = d.createElement(s); js.id = id;
		js.src = "../../../connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));


	$(".fb_icon").click(function(e) {
		e.preventDefault();
		HERSHEY.tracker.pushArrayData( "Social Media,Share-Facebook,"+$(this).parent().parent().siblings('h4').find('.div1').text() );
		FB.ui(
		{
			method: 'feed',
			name: $(this).parent().parent().siblings('h4').find('.div1').text() + " - The Spa At The Hotel Hershey",
			link: window.location.href +"#"+ $(this).parent().parent().parent().attr('id'),
			picture: window.location.origin + $('#header_image img').attr('src').replace("desktop","mobile").replace("tablet","mobile"),
			description: $(this).parent().parent().children(':first-child').text()
		},
		function(response) {
			if (response && !response.error_code) { //alert('Posting completed.');
			} else { //alert('Error while posting.');
			}
		}
		);
	});
	$('.twitter_icon').click(function(e) {
		e.preventDefault();
		HERSHEY.tracker.pushArrayData( "Social Media,Share-Twitter,"+$(this).parent().parent().siblings('h4').find('.div1').text() );
		shareIt('http://twitter.com/share?text=Relax in ultimate luxury at The Spa At The Hotel Hershey - ' + encodeURIComponent($(this).parent().parent().siblings('h4').find('.div1').text()) + '&url=','twitter',$(this).parent().parent().parent().attr('id'));
	});
	$('.pin_icon').click(function(e) {
		e.preventDefault();
		HERSHEY.tracker.pushArrayData( "Social Media,Share-Pinterest,"+$(this).parent().parent().siblings('h4').find('.div1').text() );
		shareIt('http://pinterest.com/pin/create/button/?description=Relax in ultimate luxury at The Spa At The Hotel Hershey - ' + $(this).parent().parent().siblings('h4').find('.div1').text() + '&media='+window.location.origin + $('#header_image img').attr('src').replace("desktop","mobile").replace("tablet","mobile") + '&url=','pinterest',$(this).parent().parent().parent().attr('id'));
	});
	$('.email_icon,.email_fav').click(function(e) {
		e.preventDefault();
		console.log( $(this)[0].className );
		if($(this)[0].className=="email_icon"){ HERSHEY.tracker.pushArrayData( "Social Media,Share-Email,"+$(this).parent().parent().siblings('h4').find('.div1').text() ); }
		$(this).parent().siblings(".emailer").slideToggle();
	});


	function shareIt(p_url, p_channel, p_id){
var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    ww = w.innerWidth || e.clientWidth || g.clientWidth,
    hh = w.innerHeight || e.clientHeight || g.clientHeight,
	x = w.screenX || w.screenLeft,
	y = w.screenY || w.screenTop;
//console.log("w:"+ ww +" h: "+ hh +" x: "+ x +" y: "+ y);

		var width	= 591,
		height		= 326,
		left		= x+ww/2 -width/2,
		top			= y+hh/2 -height/2,
		url			= p_url+encodeURIComponent(window.location.href.replace(location.hash,"") +"#"+ p_id),
		opts		=	'status=1' +
						',width='  + width  +
						',height=' + height +
						',top='    + top    +
						',left='   + left;

		window.open(url, p_channel, opts);

		return false;
	}
	
	$('.favor-it').click(function(e){
		$(this).text( ($(this).text()=='Add To Favorites')?'Remove From Favorites':'Add To Favorites' ).toggleClass('remove');
		e.preventDefault();
	});

	$('.favor-it').click(function(e){
		var id = $(this).attr("data-item-id");
		var type = $(this).attr("data-item-type-id");
		var favorites_page = $('.content').hasClass("favorites_page");
		var action = (($(this).hasClass("remove"))?'add':'remove');
		var dataString = 'item_id=' + id + '&item_type=' + type + '&action='+ action;
		$.ajax({
			type: "GET",
			url: "../ajax/favorites.php.html",
			data: dataString,
			cache: false,
			success: function(result) {
				if(favorites_page){ $('#'+id+'.type'+type).remove(); }
			},
			error: function(result){
			}
		});
	});
});