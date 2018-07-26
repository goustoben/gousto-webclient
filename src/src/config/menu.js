module.exports = {
	flipDay: 3,
	flipTime: '12:00:00',
	length: 14,

	stockTagTreshold: 30,

	stockThreshold: 3,

	legal: 'In addition to the recipe specific allergen information provided, due to production and packing methods Gousto boxes may also contain low levels of the following allergens: Fish; Eggs; Soya; Sesame; Sulphur dioxide and Sulphites; Mustard; Nuts.',

	helmet: {
		title: 'Food Delivery | Try Our Recipe Kits | Gousto',
		meta: [
			{
				name: 'description',
				content: 'Food delivery is simple with Gousto\'s popular recipe kit boxes. Receive fresh and seasonal ingredients straight to your home with FREE delivery',
			},
			{
				name: 'keywords',
				content: 'Gousto, recipe delivery, organic ingredients, fresh, healthy food, cooking',
			},
		],
		style: [
			{
				cssText: `
					body .zopim {
						bottom: 75px !important;
						-webkit-transition: -webkit-filter 0.3s;
						-webkit-filter: blur(0px);
						@media (max-width: 767px) {
							display: none !important;
						}
					}
				`,
			},
		],
	},

	notification: [
		{
			isAfter: '2018-03-12',
			isBefore: '2018-04-04',
			title: 'Delivery changes over Easter bank holiday',
			line1: 'Our delivery schedule is changing a bit over Easter weekend. If you\'re expecting a box on:',
			line2: ['Friday 30 March, your delivery will move to Thursday 29 March.', 'Sunday 1 April, your delivery will move to Saturday 31 March.', 'Monday 2 April, your delivery will move to Tuesday 3 April'],
			notifyGuests: false,
		},
	],

	collections: [
		{ id: 'quick-easy', label: 'Quick & Easy' },
		{ id: 'family-friendly', label: 'Family Friendly' },
		{ id: 'vegetarian', label: 'Vegetarian' },
		{ id: 'lighter', label: 'Lighter' },
		{ id: 'dairy-free', label: 'Dairy Free' },
		{ id: 'gluten-free', label: 'Gluten Free' },
	],
	balanceAndBoostBanner: {
		gelMain: {
			title: 'Boost & Balance',
			text: 'New range!',
		},
		gelOne: {
			title: 'Lean proteins',
			text: '& balanced carbs',
		},
		gelTwo: {
			title: 'Filling',
			text: '& nutritious!',
		},
	},
	fineDineInBanner: {
		gelMain: {
			title: 'Fine Dine In',
			text: 'New range!',
		},
		gelOne: {
			title: 'Premium',
			text: 'speciality ingredients',
		},
		gelTwo: {
			title: 'Rich',
			text: 'European flavours',
		},
	},
	tenToTableBanner: {
		collection: '0eee0c82-8b06-11e6-bca4-065f01f5b2df',
		startDate: '2018-03-13T12:00:00',
		gelMain: {
			text: 'Tasty',
			title: '10-min recipes',
		},
		gelOne: {
			title: 'Good food',
			text: '(no guilt!)',
		},
		gelTwo: {
			title: 'Easy-to-prep',
			text: 'ingredients',
		},
	},
}
