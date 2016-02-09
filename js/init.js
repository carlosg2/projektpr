head.js('https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js')
	.js('https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js')
	.js('js/owl.carousel.min.js')
	.js('https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.0.1/jquery.magnific-popup.min.js')
	.load('https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.0.1/magnific-popup.min.css')
	.js('https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.js')
	.js('https://cdnjs.cloudflare.com/ajax/libs/mobile-detect/1.3.1/mobile-detect.js')
	.js('https://cdnjs.cloudflare.com/ajax/libs/mobile-detect/1.3.1/mobile-detect-modernizr.js')
	.js('js/main.js');

if (head.browser.ie && parseFloat(head.browser.version) < 9) {
    head.js('https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.min.js')
    	.js('https://cdnjs.cloudflare.com/ajax/libs/selectivizr/1.0.2/selectivizr-min.js')
    	.js('https://cdnjs.cloudflare.com/ajax/libs/respond.js/1.4.2/respond.min.js');
}


/* https://cdnjs.cloudflare.com/ajax/libs/js-cookie/2.1.0/js.cookie.min.js */