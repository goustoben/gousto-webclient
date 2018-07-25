var localSession;

(function(){
	'use strict';
	localSession = {
		prefix: 'gousto:',
		storageLocation: window.localStorage,
		init: function() {
			$('[data-bind-local-session]').each(function() {
				var key = $(this).attr('data-bind-local-session');
				if(typeof key !== 'undefined') {
					if(localSession.has(key)) {
						$(this).hide();
					} else {
						$(this).show();
					}
				}
			});
		},
		get: function(key) {
			return localSession.storageLocation.getItem(localSession.prefix + key);
		},
		set: function(key, value) {
			return localSession.storageLocation.setItem(localSession.prefix + key, value);
		},
		has: function(key) {
			return localSession.storageLocation.hasOwnProperty(localSession.prefix + key);
		}
	};

	localSession.init();
})();
