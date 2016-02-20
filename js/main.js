/*jshint expr:true */

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

function isScrolledIntoView(elem) {
	var $elem = $(elem),
		$window = $(window),
		docViewTop = $window.scrollTop(),
		docViewBottom = docViewTop + $window.height(),
		elemTop = $elem.offset().top;
	return docViewBottom-100 >= elemTop;
}

function mixArray(e) {
	for (var t, i, o = e.length; 0 !== o;) i = Math.floor(Math.random() * o), o -= 1, t = e[o], e[o] = e[i], e[i] = t;
	return e;
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
			function profiles() {
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
			}
			
			function newsletter_and_profiles() {
				var el = $('#contact'), i,
					status;
	
				function init() {
					i = $('.height-md:first-of-type', el).detach();
					$('#contact').append(i);
					status = true;
				}

				$(window).resize(debouncer(function(e) {
					if (window_smaller_than(601)) {
						if (status === false) {
							init();
						}
					} else {
						i = $('.height-md:last-of-type', el).detach();
						$('#contact').prepend(i);
						status = false;
					}
				}));

				if (window_smaller_than(601)) {
					init();
				}
			}
			
			profiles();
			newsletter_and_profiles();
		},
		showElements: function() {
			var el = $('.o-layout');
			
			function init(obj) {
				if (isScrolledIntoView(obj) === true) {
				
					if ( obj.data('visible') !== true ) {
						obj.animate({
							opacity: 1
						}, {
							duration: 2000,
							easing: 'easeOutCubic'
						});
						obj.data( 'visible', true);						
					}
				}
			}
			
			
			//function debouncer(func, timeout) {
	

			$(window).on('scroll', debouncer(function(e) {
				el.each(function() {
					var _t = $(this);
					init(_t);
				});
			}, 10));

			
			
			el.each(function() {
				var _t = $(this);
				init(_t);
			});
		},
		team: function() {
			var el = $('#team'), doublesquare,
				w = $('.worker', el),
				workers = [],
				ww = $(window).width();

			// Pobierz do tablicy
			w.each(function() {
				workers.push( $(this).html() );
			});
			
			mixArray(workers);

			// Ustaw w zmienionej kolejnosci
			w.each(function(i) {
				$(this).empty().append( workers[i] );
			});
			
			// Zmien zdjecie w boxie Vertical na duze
			function showDouble() {
				var v = el.find('.vertical-photo .o-media'),
					n = v.attr('src').replace("_square", "_doublesquare"); 
				
				v.attr('src', n);
				doublesquare = true;
			}
			
			// Zmien zdjecie w boxie Vertical na male
			function showSquare() {
				var v = el.find('.vertical-photo .o-media'),
					n = v.attr('src').replace("_doublesquare", "_square"); 
				
				v.attr('src', n);
				doublesquare = false;
			}

			ww > 1024 && showDouble();

			// Rwd
			
			$(window).resize(debouncer(function(e) {
				ww = $(window).width();
				
				(ww < 1024 && doublesquare === true) ? showSquare() : showDouble();
	
			}));
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
			Layout.showElements();

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

			$('.mfp-iframe').length>0 && Layout.magnific();
			$('#team').length>0 && Layout.team();
		}
	};
	var Slider = {
		about: function() {
			var owl = $('#about .owl-carousel'),
				status;

			function description() {				
				owl.on('click', '.type-active', function() {
					$(this).toggleClass('show-description');
				});
				
				owl.on('mouseout', function() {
					$(this).removeClass('show-description');
				});
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
					dest = $('.owl-stage-outer', owl);
					//dest = $('.lead .o-box');
				
				nav.detach();
				dest.append(nav);
			}

			function showHideDetails() {
				var el = $('#portfolio .show-details a'),
					show_txt = el.attr('data-show'),
					hide_txt = el.attr('data-hide'),
					photo = $('.photo'), pause, pauseOut, details, d, d_init = 300, i, item, items_num, show_details_link;
					
				function hideDetails(obj) {
					details = obj.parents('.o-portfolio__item').find('.details'),
					item = $('.o-layout__item', details),
					items_num = item.length, i = 0, d = d_init,
					show_details_link = obj.parents('.o-portfolio__item').find('.show-details a');

					clearTimeout(pause);

					item.each(function() {
						var _t = $(this);
						
						_t.stop();							
	
						pauseOut = setTimeout(function() {
						
							_t.stop().transition({
								opacity: 0,
								rotateY: '180deg',
								perspective: '300px',
								duration: 600
							}, function() {
								i ++;
								if (i == items_num) {
									details.removeClass('active');
								}
							});
						}, d);

						d += 300;
					});

					show_details_link.html(show_txt).removeClass('active');
				}
				
				function showDetails(obj) {
					details = obj.parents('.o-portfolio__item').find('.details'),
					item = $('.o-layout__item', details),
					items_num = item.length, i = 0, d = d_init,
					show_details_link = obj.parents('.o-portfolio__item').find('.show-details a');

					clearTimeout(pauseOut);

					item.each(function() {
						var _t = $(this);
						
						pause = setTimeout(function() {
						
							if (details.not('.active')) {
								details.addClass('active');
							}
							
							_t.stop().transition({
								opacity: 1,
								rotateY: '0',
								perspective: '300px',
								duration: 600
							});
	
						}, d);
						
						d += 300;	
					});						

					show_details_link.html(hide_txt).addClass('active');
				}
				
				el.on('click', function(e) {
					e.preventDefault();
					details = $(this).parents('.o-portfolio__item').find('.details'),
					item = $('.o-layout__item', details);
					
					if ($(this).hasClass('active')) {
						hideDetails($(this));
					} else {
						showDetails($(this));
					}
				});
				
				photo.on('click', function() {
					showDetails($(this));
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