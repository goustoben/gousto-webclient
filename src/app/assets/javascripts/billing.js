/**
 * Billing specific application logic
 */
var BILLING = (function() {
	$(document).on('click', '.card-btn', function(e) {
		e.preventDefault();
		var card_type = $(this).attr('data-card-type');
		$('#cardtype option[value="' + card_type + '"]').prop('selected', true);
	});
})();


var modalWrapper = $('#onhold-billing-wrapper');
if(modalWrapper.length > 0){
	$.ajax({
		type: 'get',
		url: modalWrapper.data('remote'),
		success: function(modal) {
			modalWrapper.html(modal);
			modalWrapper.find('#onhold-billing-modal').modal('show');
		}
	});
}

