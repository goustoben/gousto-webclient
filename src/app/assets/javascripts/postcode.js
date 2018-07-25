function showPostcodePopover(element, msg) {
	element.popover({
		trigger: 'manual',
		placement: 'bottom',
		content: msg
	});
	element.data('bs.popover').options.content = msg;
	element.popover('show');
	var elem = element;
	setTimeout(function() {
		elem.popover('hide');
	}, 4000);
}
