function getAddressString(addressObj, delimiter) {
	if(typeof delimiter === 'undefined') {
		delimiter = ', ';
	}
	if(typeof addressObj !== 'undefined') {
		var addressArray = ['companyname', 'line1', 'line2', 'line3', 'town', 'county', 'postcode'];
		var addressString = '';
		$.each(addressArray, function(index, value) {
			if(addressObj.hasOwnProperty(value) && addressObj[value] !== '' && addressObj[value] !== null) {
				addressString += addressObj[value];
				if (index !== addressArray.length - 1) {
					addressString += delimiter;
				}
			}
		});
		return addressString;
	}
}

function callbackFadeSwitch(going, coming) {
	going.fadeOut(function(){
		coming.fadeIn();
	});
}

function keepMinHeight(element, container) {
	container.css('min-height', element.height());
}

// NEW ACCOUNT JS
(function(){
	$.fx.speeds._default = 500;

	// Billing Modal
	$('#payment-failed-update').on('click', function() {
		$('#account-billing-modal').modal('show');
	});
})();
