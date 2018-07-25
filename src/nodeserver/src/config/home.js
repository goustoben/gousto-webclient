import React from 'react'
import Icon from 'components/Icon'

module.exports = {
	hero: {
		header: 'A recipe box. Simple.',
		subheader: 'Fresh ingredients for you to cook and share. Good food all round.',
	},
	testimonials: [
		{
			author: 'Mrs H Pyke',
			title: 'Gousto has changed my life....',
			body: 'I cannot thank Gousto enough. What a fantastic idea! I have always struggled with time and ideas around what to cook. Now I am producing delicious, fresh and \'made from scratch\' meals for my family. I love that I don\'t have to think about what to make for our meals, its all done for me and delivered to my door (no more wandering around the supermarket hoping for inspiration). I am learning new skills and really enjoying it. I am telling everyone about Gousto, thanks so much!',
			url: 'https://uk.trustpilot.com/reviews/581cf1892ae760087cadbf17',
		},
		{
			author: 'Sophie',
			title: 'Easy, convenient and super tasty!!!',
			body: 'The best decision for my partner and I as we both work long hours! We enjoy cooking from scratch, as we know what goes into what we are eating! There is a fantastic range of meals available, all super tasty! 100% recommend to anyone!',
			url: 'https://uk.trustpilot.com/reviews/5824c0f72ae760087caf02b7',
		},
		{
			author: 'Sharon Wood',
			title: 'Hey Presto - Dinner!',
			body: 'This is a simple and convenient way to cook restaurant quality food at home. The recipes are easy to follow with everything you need in exactly the right amounts. There is a good choice of meals with new recipes added every week. All ingredients are of a vey high quality and are packed in reusable/recyclable chilled packaging. With flexible delivery schedules I would highly recommend Gousto to anybody.',
			url: 'https://uk.trustpilot.com/reviews/5824bee32ae760087caf0213',
		},

	],

	subscription: {
		header: 'How does Gousto work?',
		description: '',
		graphicType: 'svg',
		steps: [{
			path: 'icon-choose',
			title: 'You choose',
			description: 'From over 20 recipes a week. You can pause or skip boxes whenever you like.',
		}, {
			path: 'icon-delivery',
			title: 'We deliver',
			description: 'Perfectly measured ingredients, any day of the week (to fit in with your life).',
		}, {
			path: 'icon-cook',
			title: 'You cook',
			description: 'Tasty, impressive meals you’re proud to share with the people you love.',
		}],
	},

	howItWorks: {
		header: 'Home cooking is important.',
		description: 'Good intentions to cook can crumble on busy days. So we make it simple. (And tasty.)',
		steps: [
			{
				path: require('media/photos/quality.jpg'), // eslint-disable-line global-require
				title: 'Quality',
				description: 'Fresh ingredients, so you feel confident about every bite.',
			},
			{
				path: require('media/photos/simplicity.jpg'), // eslint-disable-line global-require
				title: 'Simplicity',
				description: 'Foolproof recipes, so anyone can cook a delicious meal. (Really.)',
			},
			{
				path: require('media/photos/variety.jpg'), // eslint-disable-line global-require
				title: 'Variety',
				description: 'Choose what you like: wholesome, adventurous, vegetarian, meat, fish.',
			},
		],
	},
	CTA: {
		main: <span>Get started <Icon name="fa-angle-right" size="1.5rem" style={{ marginLeft: '8px', verticalAlign: 'text-top' }} /></span>,
		join: <span>Get started <Icon name="fa-angle-right" size="1.5rem" style={{ marginLeft: '8px', verticalAlign: 'text-top' }} /></span>,
		loggedIn: {
			main: <span>See Menu <Icon name="fa-angle-right" size="1.5rem" style={{ marginLeft: '8px', verticalAlign: 'text-top' }} /></span>,
			join: <span>See Menu <Icon name="fa-angle-right" size="1.5rem" style={{ marginLeft: '8px', verticalAlign: 'text-top' }} /></span>,
		},
	},
	promo: {
		// loggedIn|loggedOut|any
		applyIf: 'loggedOut',
		code: '',
		banner: {
			text: 'Seen us on TV?',
			linkText: 'Click here to claim your 1st & 2nd box at £14.99 each!',
		},
	},
	emailForm: {
		emailRequired: 'Please provide a valid email address',
		serverError: 'There is a techinal issue, please try again later',
	},
}
