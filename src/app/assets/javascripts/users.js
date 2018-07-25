/**
 * User specific application logic
 */
var USER = (function() {

	function objectToInput(object) {
		var input = document.createElement('input')
		for (var key in object){
			input.setAttribute(key, object[key])
		}
		return input
	}

	function postReloadSelf() {
		var form = document.createElement('form')
		form.setAttribute('method', 'post')
		var data = window.goustoCheckoutFormData

		Object.keys(data)
			.filter(function(name){
				return typeof data[name] !== 'object'
			})
			.map(function(name){
				return {
					name: name,
					value: data[name],
				}
			})
			.map(objectToInput)
			.forEach(function(input){
				form.appendChild(input)
			})

		Object.keys(data)
			.filter(function(name){
				return typeof data[name] === 'object'
			})
			.forEach(function(name){
				var inputName = name+'[]'
				data[name]
					.map(function(value){
						return {
							name: inputName,
							value: value,
						}
					})
					.map(objectToInput)
					.forEach(function(input){
						form.appendChild(input)
					})
			})

		document.body.appendChild(form)
		form.submit()
	}

	$(document).on('submit', '#loginForm', function(e) {
		e.preventDefault();
		var button = $('#loginBtn');
		var l = Ladda.create(button.get(0));
		var url = $(this).attr('data-url');
		l.start();
		$.ajax({
			type: 'post',
			url: $(this).attr('action'),
			data: $(this).serialize(),
			success: function(data) {
				if (data.status === 'ok') {
					if (data.result.cancelled === true) {
						l.stop();
						var user_id = data.result.user_id;
						$('#loginModal').hide();
						$('#reactivate-cancellation-modal').modal({
							remote: '/reactivate-modal/' + user_id,
							show: true
						});
					} else {
						if($(location).attr('href').indexOf('checkout') !== -1) {
							postReloadSelf()
						} else {
							$(location).attr('href', url);
						}
					}
				} else {
					l.stop();
					if (data['error-details'] === 'invalid-details') {
						$('#login-error').show().html('Invalid login details');
						$('#password').val('');
						setTimeout(function() {
							$('#login-error').fadeOut();
						}, 5000);
					} else if (data['error-details'] === 'user-suspended') {
						$('#login-error').show().text('This account is suspended. Please contact customer care.');
						$('#password').val('');
					} else {
						$('#login-error').show().html('Unknown error, please contact customer service');
						$('#password').val('');
						setTimeout(function() {
							$('#login-error').fadeOut();
						}, 5000);
					}
				}
			}
		});
	});

})();
