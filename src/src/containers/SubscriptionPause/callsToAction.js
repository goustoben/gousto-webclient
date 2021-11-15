import createCtaContainer from 'utils/createCtaContainer'
import routesConfig from 'config/routes'
import { subscriptionPauseTrack } from "actions/subscriptionPause/subscriptionPauseTrack"
import { subscriptionPauseApplyPromo } from "actions/subscriptionPause/subscriptionPauseApplyPromo"
import { subscriptionPauseProceed } from "actions/subscriptionPause/subscriptionPauseProceed"
import { subscriptionPauseCancelPendingOrders } from "actions/subscriptionPause/subscriptionPauseCancelPendingOrders"
import { subscriptionPauseEnd } from "actions/subscriptionPause/subscriptionPauseEnd"
import { subscriptionPauseRedirect } from "actions/subscriptionPause/subscriptionPauseRedirect"
import { subscriptionPauseReasonSubmit } from "actions/subscriptionPause/subscriptionPauseReasonSubmit"
import { subscriptionPauseSkipNextBox } from "actions/subscriptionPause/subscriptionPauseSkipNextBox"
import { subscriptionPauseLoadInitReasons } from "actions/subscriptionPause/subscriptionPauseLoadInitReasons"

export function subsriptionPauseCtaContainer(args = {}) {
  return createCtaContainer({
    ...args,
    action: (dispatch, ownProps) => {
      dispatch(subscriptionPauseTrack(
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
  action: () => subscriptionPauseApplyPromo(),
  additionalProps: positiveButtonProps,
  text: 'Activate my discount',
})

export const Cancel = subsriptionPauseCtaContainer({
  action: () => subscriptionPauseProceed('cancel', 'recovered', 'changed_mind'),
  additionalProps: positiveButtonProps,
  text: 'I\'ve changed my mind',
})

export const CancelLink = subsriptionPauseCtaContainer({
  action: () => subscriptionPauseProceed('cancel', 'recovered', 'changed_mind'),
  text: 'I\'ve changed my mind',
  type: 'Link',
})

export const CancelPendingOrders = subsriptionPauseCtaContainer({
  action: () => subscriptionPauseCancelPendingOrders(),
  additionalProps: negativeButtonProps,
  text: 'Cancel order',
})

export const Dismiss = subsriptionPauseCtaContainer({
  action: () => subscriptionPauseEnd(),
  additionalProps: positiveButtonProps,
  text: 'Close',
})

export const GoToCC = subsriptionPauseCtaContainer({
  action: () => subscriptionPauseRedirect(routesConfig.client.help),
  additionalProps: positiveButtonProps,
  text: 'Contact Customer Care',
})

export const GoToDeliveries = subsriptionPauseCtaContainer({
  action: () => subscriptionPauseRedirect(routesConfig.client.myDeliveries),
  additionalProps: positiveButtonProps,
  text: 'Skip boxes',
})

export const GoToMenu = subsriptionPauseCtaContainer({
  action: () => subscriptionPauseRedirect(routesConfig.client.menu),
  additionalProps: positiveButtonProps,
  text: 'See next week\'s menu',
})

export const KeepPendingOrders = subsriptionPauseCtaContainer({
  action: () => subscriptionPauseProceed('pause', 'paused'),
  additionalProps: positiveButtonProps,
  text: 'Keep order',
})

export const Pause = subsriptionPauseCtaContainer({
  action: () => subscriptionPauseReasonSubmit(),
  additionalProps: negativeButtonProps,
  text: 'Pause anyway',
})

export const Recovered = subsriptionPauseCtaContainer({
  action: () => subscriptionPauseProceed('next', 'recovered', 'quote'),
  additionalProps: positiveButtonProps,
  text: 'Continue subscription',
})

export const SkipNextBox = subsriptionPauseCtaContainer({
  action: () => subscriptionPauseSkipNextBox(),
  additionalProps: positiveButtonProps,
  text: 'Skip one box',
})

export const StartOSR = subsriptionPauseCtaContainer({
  action: () => subscriptionPauseLoadInitReasons(),
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
