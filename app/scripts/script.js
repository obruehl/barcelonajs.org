'use strict';

(function() {
	try {
		Typekit.load({
			active: function() {
				//$('.talk,h1,h2,h3,h4').fadeIn(600);
			},
			inactive: function() {
				//$('.talk,h1,h2,h3,h4').fadeIn(600);
			}
		});
	} catch(e) {}

	function hideAddressBar() {
		setTimeout(function(){
			window.scrollTo(0, 1);
		}, 0);
	}

	window.addEventListener('load', function(){ if(!window.pageYOffset){ hideAddressBar(); } } );
	window.addEventListener('orientationchange', hideAddressBar);
})();