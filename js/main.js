function debouncer(func, timeout) {
	var timeoutID;
	timeout = timeout || 200;
	return function() {
		var scope = this,
			args = arguments;
		clearTimeout(timeoutID);
		timeoutID = setTimeout(function() {
			func.apply(scope, Array.prototype.slice.call(args));
		}, timeout);
	};
}

function window_smaller_than(num) {
	var ww = $(window).width();
	if (ww < num) {
		return true;
	} else {
		return false;
	}
}

function goToTarget(target) {
	var $viewport = $('html, body');
	
	$viewport.animate({
		scrollTop: target
	}, {
		duration: 1500,
		easing: 'easeOutCubic'
	});
}

jQuery(function($) {
	var Layout = {
		magnific: function() {
			$('.mfp-iframe').magnificPopup({
				type: 'iframe',
				mainClass: 'mfp-fade'
			});
		},
		relocations: function() {
			var el = $('#our-profiles'),
				status;

			function init() {
				el.detach();
				$('#newsletter').after(el);
				status = true;
			}
			$(window).resize(debouncer(function(e) {
				if (window_smaller_than(1024)) {
					if (status === false) {
						init();
					}
				} else {
					el.detach();
					$('#contact').append(el);
					status = false;
				}
			}));
			if (window_smaller_than(1024)) {
				init();
			}
		},
		validate: function() {
			var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
				comp = 'form',
				errClass = 'error animated shake';
			$('form').each(function() {
				var el = $(this),
					error = 0,
					submit = $('input[type="submit"], button[type="submit"]', el);
				var validateStart = function() {
						error = 0;
						$('input[type=email]', el).each(function() {
							if ($(this).prop('required')) {
								$(this).parents(comp).removeClass(errClass);
								var email = $(this).val();
								if (email === '') {
									$(this).parents(comp).addClass(errClass);
									error = 1;
								} else if (reg.test(email) === false) {
									$(this).parents(comp).addClass(errClass);
									error = 1;
								} else {
									$(this).parent().removeClass(errClass);
								}
							}
						});
						$('.error input').on('focus', function() {
							$(this).parents(comp).removeClass(errClass);
						});
						// Terminate the script if an error is found
						if (error === 1) {
							return false;
						} else {
							return true;
						}
					};
				$(submit).unbind('click').on('click', function(e) {
					var success = validateStart();
					if (success === false) {
						e.preventDefault();
					} else {
						$(el).submit();
					}
				});
			});
		},
		init: function() {
			Layout.validate();
			Layout.relocations();

			$('.goto').click(function(e) {
				e.preventDefault();
				var target = $(this).attr('href'),
					trigger = $('.nav-trigger'),
					nav = $('.c-nav-primary');
				
				var offset = $(target).offset().top - 90;
				
				if (trigger.hasClass('active')) {
					nav.removeClass('active');
					trigger.removeClass('active');
					
					setTimeout(function() {
						goToTarget(offset);
					}, 400);
				} else {
					goToTarget(offset);
				}
			});

			if ($('.mfp-iframe').length>0) {
				Layout.magnific();
			}
		}
	};
	var Slider = {
		about: function() {
			var owl = $('#about .owl-carousel'),
				status;

			function description() {
				var box = $('#about .type-active');
				
				box.on('click', function() {
					$(this).toggleClass('show-description');
				});
				
				box.on('mouseout', function() {
					$(this).removeClass('show-description');
				});
				
				console.log('a');
			}
			
			function startOwl() {
				owl.owlCarousel({
					dots: false,
					loop: true,
					nav: true,
					items: 3,
					navText: ['',''],
					smartSpeed: 450
				});
				
				// Przenies nawigacje
				var nav = $('.owl-nav', owl),
					dest = $('.o-about__proloque .o-box');
				
				nav.detach();
				dest.append(nav);

				
			}
			
			description();

			function init() {
				if (window_smaller_than(1024)) {
					if (status === true) {
						owl.trigger('destroy.owl.carousel');
						status = false;
					}
				} else {
					if (status === false) {
						setTimeout(function() {
							startOwl();
						}, 10);
						status = true;
					}
				}
			}			

			$(window).resize(debouncer(function(e) {
				init();
			}));

			if (window_smaller_than(1024)) {
				status = false;
			} else {
				status = true;
				startOwl();
			}
		},
		clients: function() {
			var owl = $('#clients .owl-carousel');
			owl.owlCarousel({
				dots: false,
				loop: true,
				nav: true,
				navText: ['',''],
				responsive: {
					0: {
						items: 1
					},
					1024: {
						items: 3
					}
				},
				smartSpeed: 450
			});
			
			// Przenies nawigacje
			var nav = $('.owl-nav', owl),
				dest = $('.o-clients__lead .o-box');
			
			nav.detach();
			dest.append(nav);		
		},
		portfolio: function() {
			var owl = $('#portfolio .owl-carousel');

			function startOwl() {
				owl.owlCarousel({
					dots: false,
					loop: true,
					items: 1,
					nav: true,
					navText: ['',''],
					smartSpeed: 450
				});
				
				// Przenies nawigacje
				var nav = $('.owl-nav', owl),
					dest = $('.o-portfolio__lead .o-box');
				
				nav.detach();
				dest.append(nav);
			}

			function showHideDetails() {
				var el = $('#portfolio .show-details a'),
					show_txt = el.attr('data-show'),
					hide_txt = el.attr('data-hide'),
					photo = $('.o-portfolio__photo');
				el.on('click', function(e) {
					e.preventDefault();
					var details = $(this).parents('.o-portfolio__item').find('.o-portfolio__details');
					
					if ($(this).hasClass('active')) {
						$('.o-layout__item', details).removeClass('active');
						$(this).html(show_txt).removeClass('active');
						
						setTimeout(function() {
							details.removeClass('active');
						}, 2000);
						
					} else {
						details.addClass('active');
						$('.o-layout__item', details).addClass('active');
						$(this).html(hide_txt).addClass('active');
					}
				});
				
				photo.on('click', function() {
					var show_details = $(this).parents('.o-portfolio__item').find('.show-details a'),
						details = $(this).parents('.o-portfolio__item').find('.o-portfolio__details');
					
						details.addClass('active');
						$('.o-layout__item', details).addClass('active');
						show_details.html(hide_txt).addClass('active');					
				});
			}
			startOwl();
			showHideDetails();			
		},
		init: function() {
			if ($('#about .owl-carousel').length > 0) {
				Slider.about();
			}
			if ($('#clients .owl-carousel').length > 0) {
				Slider.clients();
			}
			if ($('#portfolio .owl-carousel').length > 0) {
				Slider.portfolio();
			}
		}
	};
	var Nav = {
		mobileNav: function() {
			var b = $('body'),
				windowpos, ww = $(window).width();

			function fixNav() {
				windowpos = $(window).scrollTop();
				$(window).on('scroll', function() {
					windowpos = $(window).scrollTop();
					ww = $(window).width();
					if (windowpos >= 50) {
						b.addClass("low");
					} else {
						b.removeClass("low");
					}
				});
			}

			function showHide() {
				var el = $('.nav-trigger'),
					nav = $('.c-nav-primary');
				el.on('click', function(e) {
					e.preventDefault();
					$(this).toggleClass('active');
					nav.toggleClass('active');
				});
				$(window).resize(debouncer(function(e) {
					ww = $(window).width();
					if (ww > 768) {
						el.removeClass('active');
						nav.removeClass('active');
					}
				}));
			}
			fixNav();
			showHide();
		},
		init: function() {
			Nav.mobileNav();
		}
	};
	$(document).ready(function() {
		Layout.init();
		Nav.init();
		Slider.init();
		$('html').removeClass('no-js');
	});
});