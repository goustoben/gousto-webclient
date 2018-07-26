module.exports = {
	tracking: {
		pauseModalPrefix: 'SUBSCRIPTION_PAUSE_MODAL_',
	},
	screens: {
		changeDeliveryDate: {
			actions: [
				{
					type: 'Pause',
				},
				{
					type: 'GoToDeliveries',
					text: 'Change delivery',
				},
			],
			content: [
				{
					type: 'image',
					mapContent: {
						image: 'image',
					},
					defaults: {
						image: {
							title: 'Subscription pause still active',
							photo: 'subscription-still-active.jpg',
						},
					},
				},
				{
					type: 'copy',
					mapContent: {
						copy: 'message',
					},
					defaults: {
						copy: 'If a current delivery day doesn\'t suit you, it\'s easy to change this via the \'Deliveries\' page. Choose \'Change Date\', then pick a date that suits you! \nYou can also skip a delivery on this page, too.',
					},
				},
			],
			title: 'Change delivery date:',
		},
		contact: {
			actions: [
				{
					type: 'Pause',
				},
				{
					type: 'GoToCC',
				},
			],
			allowCancel: true,
			content: [
				{
					type: 'copy',
					mapContent: {
						copy: 'message',
					},
					defaults: {
						copy: 'Our customer care team are here to help. Would you like to get in touch with them?',
					},
				},
				{
					type: 'image',
					mapContent: {
						image: 'image',
					},
				},
			],
			title: 'Let\'s sort this out',
		},
		copy: {
			actions: [
				{
					type: 'Pause',
				},
				{
					type: 'Cancel',
				},
			],
			content: [
				{
					type: 'copy',
					mapContent: {
						copy: 'message',
					},
					defaults: {
						copy: 'Your feedback will help us to keep improving\n\nRight now we offer 22 recipes each week, 7 delivery days and loads of extras in the Gousto Market, but we\'re going to get even better in the future!',
					},
				},
				{
					type: 'image',
					mapContent: {
						image: 'image',
					},
				},
			],
			title: 'Thanks for letting us know',
		},
		startOsr: {
			actions: [
				{
					type: 'StartOSR',
				},
				{
					type: 'Cancel',
				},
			],
			content: [
				{
					type: 'copy',
					mapContent: {
						copy: 'message',
					},
					defaults: {
						copy: 'At Gousto we offer a subscription service to help you cook delicious meals without hassle. Each week you choose what to cook and we deliver it, simple as that. No more planning for dinner or a last minute dash to the shops.\\n\\nAfter receiving your first box, you have 4 days to decide if you want to continue with your subscription. So why not see how it works for you first?',
					},
				},
				{
					type: 'image',
					mapContent: {
						image: 'image',
					},
				},
			],
			title: 'Thanks for letting us know',
		},
		error: {
			actions: [
				{
					type: 'GoToCC',
				},
				{
					type: 'Dismiss',
				},
			],
			content: [
				{
					type: 'copy',
					mapContent: {
						copy: 'message',
					},
					defaults: {
						copy: 'Our customer care team are here to help. Would you like to get in touch with them?',
					},
				},
			],
			title: 'Oops, something went wrong!',
		},
		pausedPendingBoxes: {
			actions: [
				{
					type: 'CancelPendingOrders',
				},
				{
					type: 'KeepPendingOrders',
				},
			],
			content: [
				{
					type: 'copy',
					mapContent: {
						copy: 'message',
					},
					defaults: {
						copy: 'Do you wish to keep this order?',
					},
				},
			],
			title: 'About your existing orders',
		},
		promo: {
			actions: [
				{
					type: 'Pause',
				},
				{
					type: 'ApplyPromo',
				},
			],
			allowCancel: true,
			content: [
				{
					type: 'image',
					mapContent: {
						image: 'image',
					},
				},
				{
					type: 'copy',
					mapContent: {
						copy: 'message',
					},
				},
			],
			title: 'How does a discount on your second box sound?',
		},
		nextSkipped: {
			actions: [
				{
					type: 'GoToMenu',
				},
			],
			content: [
				{
					type: 'copy',
					mapContent: {
						copy: 'message',
					},
					defaults: {
						copy: 'Thank you for keeping your subscription active, we\'ve skipped your next box for you so you have longer to decide.',
					},
				},
				{
					type: 'image',
					mapContent: {
						image: 'image',
					},
				},
			],
			title: 'Great!',
		},
		other: {
			allowBack: true,
			allowCancel: true,
			content: [
				{
					type: 'textarea',
				},
			],
			title: 'Please tell us why you\'d like to pause',
		},
		paused: {
			actions: [
				{
					type: 'Dismiss',
				},
			],
			content: [
				{
					type: 'copy',
					mapContent: {
						copy: 'message',
					},
					defaults: {
						copy: 'Your subscription is now paused. You can turn it on again in the "Subscription" tab of your account. You can also order one-off boxes whenever you fancy, without turning on subscription! Just hit ADD BOX” in the “My Deliveries” tab of your account to do this. When you want to cook amazing meals from scratch again, we\'ll be here to make it happen!',
					},
				},
				{
					type: 'image',
					mapContent: {
						image: 'image',
					},
				},
			],
			title: 'Don\'t be a stranger!',
		},
		quote: {
			actions: [
				{
					type: 'Pause',
				},
				{
					type: 'Recovered',
				},
			],
			content: [
				{
					type: 'copy',
					mapContent: {
						copy: 'message',
					},
					defaults: {
						copy: 'Did you know you have a discount on an upcoming box? This discount will be applied automatically, so you won\'t be charged full price for your next box. Here\'s what other customers are saying about us:',
					},
				},
				{
					type: 'quote',
					defaults: {
						quote: 'Exceptionally high quality ingredients, superb meat, great big portions. No waste - one of the best bits - and a significant saving on our weekly food bill. Super excited when the box arrives each week!',
						quoteAuthor: 'Rachel, Leeds',
					},
				},
			],
			title: 'Whoa now!',
		},
		quoteSkipNext: {
			actions: [
				{
					type: 'Pause',
				},
				{
					type: 'SkipNextBox',
				},
			],
			allowCancel: true,
			content: [
				{
					type: 'copy',
					mapContent: {
						copy: 'message',
					},
					defaults: {
						copy: 'Instead of pausing, why not skip your second box to give you more time to decide if Gousto is for you? \nHere\'s what other customers are saying about us:',
					},
				},
				{
					type: 'quote',
					defaults: {
						quote: 'Exceptionally high quality ingredients, superb meat, great big portions. No waste - one of the best bits - and a significant saving on our weekly food bill. Super excited when the box arrives each week!',
						quoteAuthor: 'Rachel, Leeds',
					},
				},
			],
			title: 'Not ready to commit?',
		},
		recovered: {
			actions: [
				{
					type: 'GoToMenu',
				},
			],
			content: [
				{
					type: 'copy',
					mapContent: {
						copy: 'message',
					},
					defaults: {
						copy: 'Your account is still active. We hope you enjoy your next box!',
					},
				},
				{
					type: 'image',
					mapContent: {
						image: 'image',
					},
					defaults: {
						image: {
							title: 'Subscription pause still active',
							photo: 'subscription-still-active.jpg',
						},
					},
				},
			],
			title: 'Great!',
		},
		recoveredSkipped: {
			actions: [
				{
					type: 'GoToMenu',
				},
			],
			content: [
				{
					type: 'copy',
					mapContent: {
						copy: 'message',
					},
					defaults: {
						copy: 'Your account is still active. We hope you enjoy your next box!',
					},
				},
				{
					type: 'image',
					mapContent: {
						image: 'image',
					},
					defaults: {
						image: {
							title: 'Subscription pause still active',
							photo: 'subscription-still-active.jpg',
						},
					},
				},
			],
			title: 'Great!',
		},
		recoveredPromo: {
			actions: [
				{
					type: 'GoToMenu',
				},
			],
			content: [
				{
					type: 'copy',
					mapContent: {
						copy: 'message',
					},
					defaults: {
						copy: 'Your account is still active. We hope you enjoy your next box!',
					},
				},
				{
					type: 'image',
					mapContent: {
						image: 'image',
					},
					defaults: {
						image: {
							title: 'Subscription pause still active',
							photo: 'subscription-still-active.jpg',
						},
					},
				},
			],
			title: 'Great!',
		},
		reasonGrid: {
			allowCancel: true,
			title: 'Please tell us why you\'d like to pause',
		},
		reasonList: {
			allowCancel: true,
			title: 'Please tell us why you\'d like to pause',
		},
		skipBox: {
			actions: [
				{
					type: 'Pause',
				},
				{
					type: 'GoToDeliveries',
				},
			],
			content: [
				{
					type: 'image',
					mapContent: {
						image: 'image',
					},
					defaults: {
						image: {
							title: 'Skip Deliveries',
							photo: 'skip-delivery.png',
						},
					},
				},
				{
					type: 'copy',
					mapContent: {
						copy: 'message',
					},
					defaults: {
						copy: 'You can skip boxes instead of pausing? If you skip, we’ll send you reminders so you don’t forget to pick recipes when your next delivery is coming up.',
					},
				},
			],
			title: 'Did you know...',
		},
	},
}
