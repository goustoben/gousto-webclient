(function() {
	'use strict';

	$('#refer-a-friend').submit(function(e) {
		var postData = $(this).serializeArray();
		var formURL = $(this).attr('action');
		$.ajax({
			url: formURL,
			type: 'POST',
			data: postData,
			success: function() {
				$('#send-refer-a-friend').text('Code Sent!');
				window.setTimeout(function() {
					$('#send-refer-a-friend').text('Send');
					$('#friend-name, #friend-email').val('');
				}, 1500);
			},
			error: function() {
				$('#send-refer-a-friend').text('Error sending code.  Click to try again');
			}
		});
		e.preventDefault();
	});
	

	// Select text using whichever API is available
	function selectText(ele) {
		var range;
		if (document.selection) {
			range = document.body.createTextRange();
			range.moveToElementText(ele);
			range.select();
		} else if (window.getSelection) {
			range = document.createRange();
			range.selectNodeContents(ele);
			window.getSelection().removeAllRanges();
			window.getSelection().addRange(range);
		}
    }

    var rccTimeout;

    // Show a message to the user, optionally persistent
	function showMessage(ele,msg, persistent){
		
		var rcc = document.getElementById('referral-code-copied');
		
		rcc.innerHTML = msg;
		rcc.style.opacity = 1;

		if (!persistent){

			if (rccTimeout){
				clearTimeout(rccTimeout);
			}

			rccTimeout = setTimeout(function(){
				rcc.style.opacity = 0;
			}, 1000);
		}
	}

	// Init the Clipboard lib: https://clipboardjs.com/
	var clipboard = new Clipboard('#referral-code-box');

	// on success, select the text in the div and show the message saying copied
	clipboard.on('success', function(e) {
		selectText(e.trigger);
		showMessage(e.trigger, 'Copied!');
	});

	// on error, select the text in the div and show a message saying 'Press cmd-C to copy' 
	// will only error on Safari on OS X.
	clipboard.on('error', function(e) {
		selectText(e.trigger);
		showMessage(e.trigger, 'Press ⌘-C to copy', true);
	});

}());
