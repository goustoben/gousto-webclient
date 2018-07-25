import createCtaContainer from 'utils/createCtaContainer'
import routesConfig from 'config/routes'
import actions from 'actions/subscriptionPause'

export function subsriptionPauseCtaContainer(args = {}) {
	return createCtaContainer({
		...args,
		action: (dispatch, ownProps) => {
			dispatch(actions.subscriptionPauseTrack(
				'CTA_CLICK',
				{ text: ownProps.text || args.text },
			))
			dispatch(args.action())
		},
	})
}

const negativeButtonProps = {
	fill: false,
}

const positiveButtonProps = {
	fill: true,
}

export const ApplyPromo = subsriptionPauseCtaContainer({
	action: () => actions.subscriptionPauseApplyPromo(),
	additionalProps: positiveButtonProps,
	text: 'Activate my discount',
})

export const Cancel = subsriptionPauseCtaContainer({
	action: () => actions.subscriptionPauseProceed('cancel', 'recovered', 'changed_mind'),
	additionalProps: positiveButtonProps,
	text: 'I\'ve changed my mind',
})

export const CancelLink = subsriptionPauseCtaContainer({
	action: () => actions.subscriptionPauseProceed('cancel', 'recovered', 'changed_mind'),
	text: 'I\'ve changed my mind',
	type: 'Link',
})

export const CancelPendingOrders = subsriptionPauseCtaContainer({
	action: () => actions.subscriptionPauseCancelPendingOrders(),
	additionalProps: negativeButtonProps,
	text: 'Cancel order',
})

export const Dismiss = subsriptionPauseCtaContainer({
	action: () => actions.subscriptionPauseEnd(),
	additionalProps: positiveButtonProps,
	text: 'Close',
})

export const GoToCC = subsriptionPauseCtaContainer({
	action: () => actions.subscriptionPauseRedirect(routesConfig.client.help),
	additionalProps: positiveButtonProps,
	text: 'Contact Customer Care',
})

export const GoToDeliveries = subsriptionPauseCtaContainer({
	action: () => actions.subscriptionPauseRedirect(routesConfig.client.myDeliveries),
	additionalProps: positiveButtonProps,
	text: 'Skip boxes',
})

export const GoToMenu = subsriptionPauseCtaContainer({
	action: () => actions.subscriptionPauseRedirect(routesConfig.client.menu),
	additionalProps: positiveButtonProps,
	text: 'See next week\'s menu',
})

export const KeepPendingOrders = subsriptionPauseCtaContainer({
	action: () => actions.subscriptionPauseProceed('pause', 'paused'),
	additionalProps: positiveButtonProps,
	text: 'Keep order',
})

export const Pause = subsriptionPauseCtaContainer({
	action: () => actions.subscriptionPauseReasonSubmit(),
	additionalProps: negativeButtonProps,
	text: 'Pause anyway',
})

export const Recovered = subsriptionPauseCtaContainer({
	action: () => actions.subscriptionPauseProceed('next', 'recovered', 'quote'),
	additionalProps: positiveButtonProps,
	text: 'Continue subscription',
})

export const SkipNextBox = subsriptionPauseCtaContainer({
	action: () => actions.subscriptionPauseSkipNextBox(),
	additionalProps: positiveButtonProps,
	text: 'Skip one box',
})

export const StartOSR = subsriptionPauseCtaContainer({
	action: () => actions.subscriptionPauseLoadInitReasons(),
	additionalProps: negativeButtonProps,
	text: 'I still want to pause',
})

export default {
	ApplyPromo,
	Cancel,
	CancelPendingOrders,
	CancelLink,
	Dismiss,
	GoToCC,
	GoToDeliveries,
	GoToMenu,
	KeepPendingOrders,
	Pause,
	Recovered,
	SkipNextBox,
	StartOSR,
}
