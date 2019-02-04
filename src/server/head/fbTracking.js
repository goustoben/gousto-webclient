const fbAppID = require('config/template').head.fbAppID

function fbTracking() {
  return (
    `<script>
		window.fbAsyncInit = function() {
			FB.init({
				appId      : '${fbAppID}',
				xfbml      : true,
				version    : 'v2.5'
			});
		};
		(function(d, s, id){
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {return;}
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));(function(d, s, id){
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {return;}
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/en_US/messenger.Extensions.js";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'Messenger'));</script>`
  )
}

export default fbTracking
