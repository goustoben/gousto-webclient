var AnalyticsUtils = {
	getDeliveryDayId: function() {
		return basket.deliveryDateId();
	},

	getRecipeIdByChild: function(recipeChild) {
		return $(recipeChild).closest('.itemgridchild').data('recipe-id');
	},

	getRecipePositionByChild: function(recipeChild) {
		return $(recipeChild).closest('.itemgridchild').prevAll().length;
	},

	getRecipePositionById: function(recipeId) {
		return $('#this-weeks-recipes').find('div.itemgridchild[data-recipe-id="' + recipeId + '"]').prevAll().length;
	},

	getSortingName: function(sortingButton) {
		return $.trim($(sortingButton).text()).replace(/[\s]{2,}/g, ' ');
	},

	getSortingOrder: function(isotopeContainer) {
		var recipeIds = [];
		$.each(isotopeContainer.data('isotope').filteredItems, function() {
			recipeIds.push($(this.element).data('recipeId'));
		});
		return recipeIds;
	},

	'deliveryCalled': false

};
