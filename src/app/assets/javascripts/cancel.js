$('.cancel-alternative a.put-on-hold').click(function(e) {
	e.preventDefault();
	var l = Ladda.create(this);
	l.start();
	form = $(this).closest('form');
	input = form.serialize();
	$.post(form.attr('action'), input)
		.success(function(data) {
			if (data.result == 'ok') {
				$('#account-hold-success-next-date').html(data.next_delivery_date);
				$('#account-hold-success-modal').modal('show');
				window.setTimeout('window.location.href = \'/my-account#my-deliveries\';', 3000);
			} else {
				$('#account-hold-failure-modal').modal('show');
			}
		})
		.always(function() {
			l.stop();
		});
});

$('.cancel-alternative a.pause-subscription').click(function(e) {
	e.preventDefault();
	var l = Ladda.create(this);
	l.start();
	form = $(this).closest('form');
	input = form.serialize();
	$.post(form.attr('action'), input)
		.success(function(data) {
			if (data.subscription_state == 'inactive') {
				$('.deliveries-restart').html('You will need to reactivate your account to receive deliveries again.');
				$('#account-hold-success-modal').modal('show');
				window.setTimeout('window.location.href = \'/cookbook\';', 3000);
			} else {
				$('#account-hold-failure-modal').modal('show');
			}
		})
		.always(function() {
			l.stop();
		});
});

$('#cancel-modal-button').click(function(e) {
	$('#cancel-modal').modal('show');
});
