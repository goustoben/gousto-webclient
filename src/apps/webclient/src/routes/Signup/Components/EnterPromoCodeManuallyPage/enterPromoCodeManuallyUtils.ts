import Immutable from 'immutable'
import { Dispatch } from 'redux'
import { basketPromoCodeChange } from 'actions/basket'
import { promoGet, promoChange } from 'actions/promos'
import { trackUTMAndPromoCode } from 'actions/tracking'
import { redirect } from 'actions/redirect'

export type Status = 'empty' | 'success' | 'error'

/**
 * Given the promoStore entry, return the human-readable campaign description as html.
 *
 * The legacy promo code entering process (in gousto-admin) inserts the style
 * attributes in the html.  The styles declared in these attributes do not
 * match the current design practices.
 *
 * Sample input:
 * `
 * <p class="lead" style="box-sizing: border-box; margin: 0px 0px 20px; font-size: 16.2px; line-height: 1.4; font-family: Lato, Helvetica, sans-serif; font-variant-ligatures: normal; orphans: 2; widows: 2; color: #373a3c;">You have a voucher for&nbsp;<strong style="font-size: 16.2px;">60% off</strong><span style="font-size: 16.2px;">&nbsp;your first box,&nbsp;</span><strong style="font-size: 16.2px;">PLUS 30% off</strong><span style="font-size: 16.2px;">&nbsp;all other boxes you order in your first month.</span></p>
 *
 * <p class="lead" style="box-sizing: border-box; margin: 0px 0px 20px; font-size: 16.2px; line-height: 1.4; font-family: Lato, Helvetica, sans-serif; font-variant-ligatures: normal; orphans: 2; widows: 2; color: #373a3c;">Click 'Claim Discount' below and your voucher will be automatically applied at checkout.</p>
 *
 * <p class="lead" style="box-sizing: border-box; margin: 0px 0px 20px; font-size: 16.2px; line-height: 1.4; font-family: Lato, Helvetica, sans-serif; font-variant-ligatures: normal; orphans: 2; widows: 2; color: #373a3c;">Happy cooking!</p>
 * `
 *
 * We'd like to support promo codes entered at any time, but use the modern
 * styling. So the style attributes are removed.
 *
 * @param promoStoreEntry: an Immutable.JS representation of the response of
 * the `/promocode/<code>` endpoint
 *
 * @return html of the campaign text
 *
 */
export const getPromoCodeCampaignTextHtml = (promoStoreEntry: Immutable.Map<string, any>) => {
  const rawHtml = promoStoreEntry?.getIn(['codeData', 'campaign', 'modalText'])

  if (!rawHtml) {
    return null
  }

  // It is safe to use this regexp, as `style="<...>"` is not a text that would
  // occur naturally in any promo code description; and the promo entering
  // process is stable enough that we can expect the pattern to hold for any
  // promo code.
  const html = rawHtml.replaceAll(/style=".*?"/g, '')

  return html
}

/**
 * Given a promo code typed by the user, set the correct state to display the
 * page based on the cache of requests in promoStore, or starting the request
 * to retrieve the promo code information if necessary.
 */
export const checkPromoCode = (
  promoCode: string,
  isPending: boolean,
  dispatch: any,
  promoStore: Immutable.Map<string, any>,
  setStatus: (status: Status) => void,
  setCampaignTextHtml: (campaignTextHtml: string) => void
) => {
  if (!promoCode) {
    setStatus('empty')

    return
  }
  if (isPending) {
    return
  }

  const promoStoreEntry = promoStore.get(promoCode, null)
  if (!promoStoreEntry) {
    dispatch(promoGet(promoCode))

    return
  }

  const hasError = !!promoStoreEntry.get('errorText')
  if (!hasError) {
    const campaignTextHtml = getPromoCodeCampaignTextHtml(promoStoreEntry)
    setCampaignTextHtml(campaignTextHtml)
  }
  setStatus(hasError ? 'error' : 'success')
}

/**
 * Apply the given promo code, send a snowplow event, and leave to the next
 * page in the flow.
 */
export const proceedWithPromoCode = (
  dispatch: Dispatch<any>,
  promoCode: string,
  eventType: string,
  eventAdditionalData = {}
) => {
  dispatch(trackUTMAndPromoCode(eventType, eventAdditionalData))
  dispatch(promoChange(promoCode))
  dispatch(basketPromoCodeChange(promoCode))
  dispatch(redirect('/signup'))
}
