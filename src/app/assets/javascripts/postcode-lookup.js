var PostcodeLookup = {

	_remoteUrl: '/postcode',

	_formatErrorMessage: function(errorMsg) {
		var formattedErrorMsg = 'Error';

		if (errorMsg === 'Invalid postcode') {
			formattedErrorMsg = 'Please provide a valid postcode.';
		} else if (errorMsg === 'We do not ship to that postcode') {
			formattedErrorMsg = 'Sorry we don\'t deliver to this region yet.';
		}

		return formattedErrorMsg;
	},

	isDeliveryAvailable: function(postcode, onSuccess, onError, onAlways) {
		var self = this;
		var postcodeURL = self._remoteUrl + '/' + postcode.replace(/\s+/g, '');
		var pcodeError = 'Error';

		$.ajax({
			url: postcodeURL,
			type: 'GET',
			success: function(data) {
				if (data.status === 'error') {
					pcodeError = self._formatErrorMessage(data.error);

					if (typeof onError === 'function') {
						onError(pcodeError);
					}

				} else if (typeof onSuccess === 'function') {
					onSuccess(postcode);
				}
			},
			error: function() {
				if (typeof onError === 'function') {
					onError(pcodeError);
				}
			},
			complete: function() {
				if (typeof onAlways === 'function') {
					onAlways();
				}
			}
		});
	},

	getListOfAddresses: function(postcode, config) {
		if (typeof config === 'undefined') {
			config = {};
		}

		addressService = CraftyPostcodeCreate();

		//set defaults
		addressService.set('access_token', 'e3ed3-c738a-002e8-00cb8');
		addressService.set('org_uppercase', 0);
		addressService.set('town_uppercase', 0);
		addressService.set('max_width', '');
		addressService.set('busy_img_url', 'img/icons/crafty_postcode_busy.gif');
		addressService.set('res_autoselect', 0);
		addressService.set('res_select_on_change', 1);
		addressService.set('single_res_autoselect', 1);
		addressService.set('single_res_notice', 'Only one address returned for postcode. Please input manually if this is an error.');

		//override defaults
		for (var i in config) {
			addressService.set(i, config[i]);
		}

		addressService.doLookup();
	},

	emptyInputFields: function(editButton, inputFields) {
		editButton.hide();
		inputFields.val('').removeClass('empty').prop('readonly', false);
	},

	updateInputFields: function(editButton, inputFields) {
		inputFields.each(function(){
			var input = $(this);
			input.prop('readonly', true);
			editButton.show();
			if (input.val() === '') {
				input.addClass('empty');
			} else {
				input.removeClass('empty');
			}
		});
	},

	showInputFields: function(editButton, inputFields) {
		editButton.hide();
		inputFields.removeClass('empty').prop('readonly', false);
	},

	hideInputFields: function(editButton, inputFields) {
		editButton.hide();
		inputFields.addClass('empty').prop('readonly', true);
	},

	showCantFindButton: function(cantFindButton) {
		cantFindButton.show();
	},

	hideCantFindButton: function(cantFindButton) {
		cantFindButton.hide();
	}
};
