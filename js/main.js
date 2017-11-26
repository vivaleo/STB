


$(document).ready(function () {
    "use strict";
    $("#submit").click(function () {

        var username = $("#myusername").val(), password = $("#mypassword").val();

        if ((username === "") || (password === "")) {
            $("#message").html("<div class=\"alert alert-danger alert-dismissable\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button>Please enter a username and a password</div>");
        } else {
            $.ajax({
                type: "POST",
                url: "checklogin.php",
                data: "myusername=" + username + "&mypassword=" + password,
                dataType: 'JSON',
                success: function (html) {
                    //console.log(html.response + ' ' + html.username);
                    if (html.response === 'true') {
                        //location.assign("../index.php");
                       location.reload();
                        return html.username;
                    } else {
                        $("#message").html(html.response);
                    }
                },
                error: function (textStatus, errorThrown) {
                    console.log(textStatus);
                    console.log(errorThrown);
                },
                beforeSend: function () {
                    $("#message").html("<p class='text-center'><img src='images/ajax-loader.gif'></p>");
                }
            });
        }
        return false;
    });
});
//登录功能结束


$(document).ready(function(){
   "use strict";
  $("#submit").click(function(){
    var username = $("#newuser").val();
    var password = $("#password1").val();
    var password2 = $("#password2").val();
    var email = $("#email").val();

    if((username === "") || (password === "") || (email === "")) {
      $("#message").html("<div class=\"alert alert-danger alert-dismissable\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button>Please enter a username and a password</div>");
    }
    else {
      $.ajax({
        type: "POST",
        url: "createuser.php",
        data: "newuser="+username+"&password1="+password+"&password2="+password2+"&email="+email,
        success: function(html){

			var text = $(html).text();
			//Pulls hidden div that includes "true" in the success response
			var response = text.substr(text.length - 4);

          if(response === "true"){

			$("#message").html(html);

					$('#submit').hide();
			}
		else {
			$("#message").html(html);
			$('#submit').show();
			}
        },
        beforeSend: function()
        {
          $("#message").html("<p class='text-center'><img src='images/ajax-loader.gif'></p>");
        }
      });
    }
    return false;
  });
});
//注册功能结束


//计数功能开始
(function () {
	'use strict';
  var counter = function() {
	$('.js-counter').countTo(
	{
		formatter: function (value, options) {
			return value.toFixed(options.decimals);
		},
	
	});
  };
  var counterWayPoint = function() {
	  if ($('#stb-counter').length > 0 ) {
		  $('#stb-counter').waypoint( function(direction ) {
			                        
			  if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				  setTimeout( counter , 400);
				  $(this.element).addClass('animated');
			  }
		  } , { offset: '90%' } );
		  
	  }
  };
	
  
	var testimonialCarousel = function(){
		
		var owl = $('.owl-carousel-fullwidth');
		owl.owlCarousel({
			items: 1,
			loop: true,
			margin: 0,
			nav: false,
			dots: true,
			smartSpeed: 800,
			autoHeight: true
		});
	};
	
  
  $(function(){
	  counterWayPoint();
	  counter();
	  testimonialCarousel();
	  
  });
}());


    //  Isotope Filter 
    // ---------------------------------------------- 
	(function () {
		'use strict';
		var winDow = $(window);
		var $container=$('.portfolio-items');
		var $filter=$('.filter');

		try{
			$container.imagesLoaded( function(){
				$container.show();
				$container.isotope({
					filter:'*',
					layoutMode:'masonry',
					animationOptions:{
						duration:750,
						easing:'linear'
					}
				});
			});
		} catch(err) {
		}

		winDow.bind('resize', function(){
			var selector = $filter.find('a.active').attr('data-filter');

			try {
				$container.isotope({ 
					filter	: selector,
					animationOptions: {
						duration: 750,
						easing	: 'linear',
						queue	: false,
					}
				});
			} catch(err) {
			}
			return false;
		});

		$filter.find('a').click(function(){
			var selector = $(this).attr('data-filter');

			try {
				$container.isotope({ 
					filter	: selector,
					animationOptions: {
						duration: 750,
						easing	: 'linear',
						queue	: false,
					}
				});
			} catch(err) {

			}
			return false;
		});


		var filterItemA	= $('.filter a');

		filterItemA.on('click', function(){
			var $this = $(this);
			if ( !$this.hasClass('active')) {
				filterItemA.removeClass('active');
				$this.addClass('active');
			}
		});
	}()); 



// Dropdown Menu Fade    
(function(){
	'use strict';
    $(".dropdown").hover(
        function() { $('.dropdown-menu', this).fadeIn("fast");
        },
        function() { $('.dropdown-menu', this).fadeOut("fast");
    });
}());







/*========================================================================
	Owl cCarousel
==========================================================================*/		
	

	$("#sponsor_slide").owlCarousel({
 
      autoPlay: 3000, //Set AutoPlay to 3 seconds
 
      items : 5,
      itemsDesktop : [1199,3],
      itemsDesktopSmall : [979,3],
	  itemsTablet : [768,3],
	  itemsMobile :	[480,1],
	  navigation : true,
	  navigationText : false,
	  pagination : false
	  
 
  });	
$("#lecture-slide").owlCarousel({
 
      autoPlay: 3000, //Set AutoPlay to 3 seconds
 
      items : 4,
      itemsDesktop : [1199,4],
      itemsDesktopSmall : [979,3],
	  itemsTablet : [768,3],
	  itemsMobile :	[480,1],
	  navigation : true,
	  navigationText : false,
	  pagination : false,
	  responsive : true,
	  autoHeight : true,
	  
 
  });


/*========================================================================
	GNmenu Wrapper 跟随找项目弹出
==========================================================================*/









    $('[data-toggle="collapse"]').hover(
    function(){
		    'use strict';
            console.log('on hover');
            var thisdiv = $(this).attr("data-target");

            if(!$(this).hasClass('state-open')){
                $(this).addClass('state-hover');                
                $(thisdiv).css({
                    'height':'30px'
                });    
            }
            
        },
        function(){
			'use strict';
            var thisdiv = $(this).attr("data-target");
            $(this).removeClass('state-hover');
            
            if(!$(this).hasClass('state-open')){
                $(thisdiv).css({
                    'height':'0px'
                });     
            }          
        }
    );
    
    $('[data-toggle="collapse"]').click(
    function(event){
		    'use strict';
            event.preventDefault();
                        
            var thisdiv = $(this).attr("data-target");
            var height = $(thisdiv).children('.panel-body').height();
            
            if($(this).hasClass('state-open')){
                $(thisdiv).css({
                    'height':'0px',
                }); 
                $(this).removeClass('state-open');    
            } else {
                $(thisdiv).css({
                    'height':height,
                }); 
                $(this).addClass('state-open');
            }
        }
    );

$(function () {
	'use strict';
    $('[data-toggle="collapse"]').each(function () {
        var thisdiv = $(this).attr("data-target");
        $(thisdiv).addClass("collapse");
    });
    
});
