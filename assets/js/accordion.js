/* -------------------------------------- accordion expand/collapse */
$(function(){
	if(window.location.hash){
		var $target = $(window.location.hash);
		setTimeout( function(){ $('html,body').stop().animate({ 'scrollTop': $target.offset().top }, 1000 ); } , 1000 );
		$(window.location.hash).addClass('show');
	}
	
		// create nav elements
		$('.accordion div h4').prepend(' <a class="toggle_btn">Toggle</a>');

		// all expand / collapse
		$('.accordion div h4').css({ cursor: 'pointer' });
		$('.accordion div h4').click(function(e){
			e.preventDefault();

			//tracking
			if( $(this).attr("data-track-event") ){
				parseData = $(this).attr("data-track-event").split(',');
				$(this).attr("data-track-event", parseData[0] +","+ ( $(this).closest('div').hasClass('show')?'hide':'show' ) +","+ parseData[2] );
				HERSHEY.tracker.trackCustom( $(this) );
			}

			$(this).closest('div')
				.toggleClass('show')
				.children('div').slideToggle();
		});
		/*
		if(window.location.hash) {
			if($('.accordion h4'+window.location.hash)){
				$(".accordion .show").removeClass("show").slideToggle(0);
				$('.accordion h4'+window.location.hash).trigger('click');
			}
		}
		*/

		// single expand / collapse
		$('.accordion a.expandcollapse_icon').click(function(e){
			e.preventDefault();
			$('.accordion>div').toggleClass('show');
			$('.accordion>div>div').slideToggle();
		});
		
		$('#xall').click(function(e){
			e.preventDefault();
			if($(this).hasClass("allExpanded")){
			// all collapse
				$(this).removeClass("allExpanded").text("Expand All [+]");
				$('.accordion>div').removeClass('show');
				$('.accordion>div>div').slideUp();
			}
			else{
			// all expand
				$(this).addClass("allExpanded").text("Collapse All [-]");
				$('.accordion>div').addClass('show');
				$('.accordion>div>div').slideDown();
			}
		});

		//default open 'show' divs
		$('.accordion .show div').slideDown();

	$('.zebraTable>div:nth-child(odd)').addClass('odd');
	$('.zebraTable>div:nth-child(even)').addClass('even');

});
