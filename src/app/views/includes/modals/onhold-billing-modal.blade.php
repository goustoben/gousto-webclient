<div class="modal fade gmodal" id="onhold-billing-modal" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title">
					Your account is on hold
				</h4>
			</div>
			<div id="billingdetails">
				@include('includes.payment-method-form')
			</div>
		</div>
	</div>
</div>

<script type="text/javascript">
	var form = $('#account-payment-method-form');
	var title = $('#onhold-billing-modal .modal-title');
	form.submit(function(e){
		var postData = $(this).serializeArray();
		var formURL = $(this).attr("action");
		function fail(){
			title.text('Failed to update payment details');
			form.replaceWith(
				'<div class="modal-body">' +
					'<p>Unfortunately we have been unable to update your billing details.</p>' +
					'<p>Please try again later or contact customer service on {{{ Config::get('company.telephone') }}} for assistance.</p>' +
				'</div>'
			);
		}

		function successMsg(){
			title.text('Payment details updated successfully');
			form.replaceWith(
				'<div class="modal-body">' +
					'<p>Thank you, your payment details have been updated and your account has been restored. For details of your subscription go to My Subscription to find out when your next delivery is go to My Deliveries</p>' +
				'</div>' +
				'<div class="modal-footer">' +
					'<a class="gbtn-primary ladda-button" id="billing-close-reload" data-style="slide-left">Ok</a>'+
				'</div>'
			);

			$('#billing-close-reload').on('click', function() {
				var l = Ladda.create(this);
				l.start();
				if($('form#choices').length > 0){
					basket.preSubmit();
					$('form#choices').submit();
				} else {
					location.reload();
				}

			});
		}

		var l = Ladda.create($('#billing-submit-button').get(0));
		l.start();

		$.ajax({
			url: formURL,
			type: 'post',
			data: postData,
			success: function(response){
				if(response.error){
					fail();
				} else if(response.MD !== undefined){
					$('#account-payment-method-form div.form-group, #cards').hide();
					$('#account-payment-method-form div.form-group:last').after(
						'<iframe src="/3dsecure?MD=' + response.MD + '&ACSURL=' + response.ACSURL +
						'&PAReq=' + response.PAReq + '&VendorTxCode=' + response.VendorTxCode +
						'" id="3DIFrame" name="3DIFrame" width="100%" height="500" frameborder="0"></iframe>'
					);
				} else {
					successMsg();
				}
				l.stop();
			},
			error: function(){
				fail();
				l.stop();
			}
		});
		e.preventDefault();
	});

	jQuery.validator.setDefaults({
		errorElement: 'div',
		success: 'valid'
	});

	form.validate({
		rules: {
			card_number: {
				required: true,
				creditcard: true
			},
			exp_mm: {
				required:true,
				digits:true
			},
			exp_yy: {
				required:true,
				digits:true
			},
			card_cvv2: {
				minlength:3,
				maxlength:3,
				required:true
			}
		}
	});

	$('.validatebd').click(function(){
		$('#card_expires').val($('#exp_mm').val() + '/' + $('#exp_yy').val());
		if(form.valid()){
			form.submit();
		}
	});

	//Populate Expiration year input
	var select = $('.card-expiry-year');
	var year = new Date().getFullYear() - 2000;
	for (var i = 0; i < 30; i++) {
		select.append($('<option value="' + (i + year) + '" >' + (i + year) + '</option>'));
	}
</script>
