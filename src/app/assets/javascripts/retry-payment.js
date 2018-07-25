if($('#retry-payment').length){
	var form = $('#account-payment-method-form');
	form.validate({
		rules: {
			card_number: {
				required: true,
				creditcard: true
			},
			exp_mm: {
				required: true,
				digits: true
			},
			exp_yy: {
				required: true,
				digits: true
			},
			card_cvv2: {
				minlength: 3,
				maxlength: 3,
				required: true
			}
		}
	});

	var select = $('.card-expiry-year'),
	year = new Date().getFullYear() - 2000;
	for (var i = 0; i < 30; i++) {
		select.append($('<option value="' + (i + year) + '">' + (i + year) + '</option>'));
	}

	$(document).on('click', '.validatebd', function(){
		$('#card_expires').val($('#exp_mm').val() + '/' + $('#exp_yy').val());
		if(form.valid()){
			form.submit();
		}
	});

	$(document).on('submit', '#account-payment-method-form', function(e){
		var postData = $(this).serialize();
		var formURL = $(this).attr('action');

		$('#billing-submit-button').prop('disabled', 'true');

		$.ajax({
			url: formURL,
			type: 'post',
			data: postData,
			success: function(){
				location.reload();
			},
			error: function(){
				location.reload();
			}
		});
		e.preventDefault();
	});
}
