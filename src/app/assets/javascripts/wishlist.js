$('form[name="reminder-form"]').on('click', '#wishlist-button', function(e) {
	e.preventDefault();
	var button = $(e.target);
	var form = $(e.target).parent();
	var oldtext = button.text();
	button.text('Saving...');
	button.prop('disabled', true);
	button.unbind('click');
	$.ajax({
		type: 'post',
		url: form.attr('action'),
		data: form.serialize(),
		success: function(data) {
			var button = $(e.target);
			var form = $(e.target).parent();
			if (data.status === 'ok') {
				if (data.event === 'created') {
					var userid = data.result.data.created.user_id;
					var recipeid = data.result.data.created.recipe_id;
					button.text('Saved');
					setTimeout(function() {
						var wishtext = $(e.target).parent().siblings('.wishlist-text');
						wishtext.text('This recipe is in your wishlist! We\'ll let you know the next time it\'s on the menu to order.');
						button.prop('disabled', false);
						button.text('Remove from my wishlist >');
						form.attr('action', '/user/' + userid + '/wishlist-remove/' + recipeid);
						button.bind('click');
					}, 800);
				} else if (data.event === 'deleted') {
					var userid = data.result.data.deleted.user_id;
					var recipeid = data.result.data.deleted.recipe_id;
					button.text('Saved');
					setTimeout(function() {
						var wishtext = $(e.target).parent().siblings('.wishlist-text');
						wishtext.text('Looks delicious doesn\'t it? Add it to your wish list & we\'ll let you know the next time it\'s on the menu to order:');
						button.prop('disabled', false);
						button.text('Add to my wishlist >');
						form.attr('action', '/user/' + userid + '/wishlist/' + recipeid);
						button.bind('click');
					}, 800);
				} else {
					button.bind('click');
					button.text(oldtext);
					button.prop('disabled', false);
				}
			} else {
				button.bind('click');
				button.text(oldtext);
				button.prop('disabled', false);
			}
		}
	});
});
