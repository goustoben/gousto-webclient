// Sends an email from the email address entered from the "Have a question form"
$('#haveaquestion').submit(function(e) {
	e.preventDefault();
	$('#haveaquestion-container .error-msg').addClass('hide');
	var details = $('#haveaquestion').serialize();
	$.post($('#haveaquestion').attr('action'), details)
		.success(function(data) {
			if (data.status === 'ok') {
				$('#haveaquestion-container').html('<p class="col-md-12">Thank you for your question, we will reply as soon as possible.</p>');
			} else {
				$('#haveaquestion-container .error-msg').html('There was a problem sending your question.').removeClass('hide');
			}
		})
		.fail(function(data) {
			$('#haveaquestion-container .error-msg').html('There was a problem sending your question.').removeClass('hide');
		});
});
