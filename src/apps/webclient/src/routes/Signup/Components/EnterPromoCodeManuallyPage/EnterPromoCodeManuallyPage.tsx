import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from 'reselect'
import { useDebounce, usePrevious } from 'react-use'
import {
  Box,
  Display,
  Link,
  LinkVariant,
  useTheme,
  Color,
  AlignItems,
  JustifyContent,
  Button,
  InputField,
  FormFieldStatus,
  Space,
  Heading5,
  Paragraph,
  Join,
} from '@gousto-internal/citrus-react'
import { actionTypes } from 'actions/actionTypes'
import { InformationalPageTemplate } from 'routes/Signup/Components/InformationalPageTemplate'
import { promoGet, promoChange } from 'actions/promos'
import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'
import { getPromoStore } from 'routes/Signup/signupSelectors'
import { promo } from 'config/home'
import css from './EnterPromoCodeManuallyPage.css'

const DEBOUNCE_MS = 500

export const createSelectPromoStoreEntryByPromoCode = (promoCode: string) =>
  createSelector(getPromoStore, (promoStore) => {
    return promoStore.get(promoCode, null)
  })

export const selectPendingSlice = (state: any) => state.pending

export const createSelectIsPendingByActionType = (actionType: string) =>
  createSelector(selectPendingSlice, (pendingSlice) => pendingSlice.get(actionType))

export type Status = 'empty' | 'success' | 'error'

const checkPromoCode = (
  value: any,
  isPending: any,
  dispatch: any,
  promoStoreEntry: any,
  setStatus: (status: Status) => void
) => {
  console.log('checkPromoCode starts', value, isPending, promoStoreEntry)
  if (!value) {
    setStatus('empty')
    return
  }
  if (isPending) {
    return
  }
  if (promoStoreEntry) {
    const hasError = !!promoStoreEntry.get('errorText')
    setStatus(hasError ? 'error' : 'success')
  } else {
    dispatch(promoGet(value))
  }
}

export const SuccessSection = ({ promoCodeCampaignTextHtml }: any) => {
  return (
    <>
      <Heading5>You got a discount!</Heading5>
      <div
        className={css.promoCodeCampaignText}
        dangerouslySetInnerHTML={{ __html: promoCodeCampaignTextHtml }}
      />
    </>
  )
}

export const FailureSection = ({ onClaimWelcomePromoCodeClick }: any) => {
  const isTwoMonthPromoCodeEnabled = useIsOptimizelyFeatureEnabled(
    'beetroots_two_month_promo_code_web_enabled'
  )
  const lines = isTwoMonthPromoCodeEnabled
    ? promo.twoMonthDescriptionLines
    : promo.defaultDescriptionLines
  return (
    <>
      <Space size={6} />
      <Heading5>Claim our welcome discount instead!</Heading5>
      <Space size={2} />
      <Join with={<Space size={4} />}>
        {lines.map((line, index) => {
          return (
            <Paragraph key={index} size={2}>
              {line}
            </Paragraph>
          )
        })}
      </Join>

      <Space size={4} />
      <Button height={48} width="100%" onClick={onClaimWelcomePromoCodeClick}>
        Claim welcome discount
      </Button>
    </>
  )
}

/**
 *
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
export const getPromoCodeCampaignTextHtml = (promoStoreEntry: any) => {
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

export const EnterPromoCodeManuallyPage = () => {
  const [value, setValue] = useState('')
  const [status, setStatus] = useState<Status>('empty')

  const dispatch = useDispatch()

  const promoStoreEntry = useSelector(createSelectPromoStoreEntryByPromoCode(value))

  const isPending = useSelector(createSelectIsPendingByActionType(actionTypes.PROMO_GET))

  const previousIsPending = usePrevious(isPending)

  const handleContinueClick = () => {
    console.log('todo cont')
  }

  const handleClaimWelcomePromoCodeClick = () => {
    console.log('todo welcome')
  }

  const [_isReady, cancel] = useDebounce(
    () => {
      checkPromoCode(value, isPending, dispatch, promoStoreEntry, setStatus)
    },
    DEBOUNCE_MS,
    [value]
  )

  useEffect(() => {
    if (previousIsPending !== isPending) {
      checkPromoCode(value, isPending, dispatch, promoStoreEntry, setStatus)
    }
  }, [previousIsPending, isPending, value, dispatch, promoStoreEntry, setStatus])

  useEffect(() => {
    return () => {
      cancel()
    }
  }, [cancel])

  const promoCodeCampaignTextHtml = getPromoCodeCampaignTextHtml(promoStoreEntry)

  return (
    <InformationalPageTemplate
      testingSelector="enterPromoCodeManuallyPage"
      headerText="Enter your discount code!"
      headerSize="fontStyle2XL"
      hasSmallerMarginBelowHeader
    >
      {/* Negative margin offsets the size of label+space between label and
          input.  citrus/InputField has required label, and it is out of scope
          for the current story to fix the external library. */}
      <div style={{ marginTop: -32 }}>
        <InputField
          id="enterPromoCodeManuallyInputField"
          label=""
          placeholder="45-56-69"
          status={
            status === 'empty'
              ? undefined
              : status === 'success'
              ? FormFieldStatus.Success
              : FormFieldStatus.Error
          }
          validationMessage={status === 'error' ? 'This discount code is not valid.' : undefined}
          value={value}
          onChange={(event) => {
            const inputValue = event.target.value
            setValue(inputValue.toUpperCase())
          }}
        />
      </div>
      <Space size={4} />
      {status === 'success' ? (
        <SuccessSection
          promoCodeCampaignTextHtml={promoCodeCampaignTextHtml}
          onContinueClick={handleContinueClick}
        />
      ) : null}
      <Button height={48} width="100%" disabled={status !== 'success'}>
        Continue
      </Button>
      {status === 'error' ? (
        <FailureSection onClaimWelcomePromoCodeClick={handleClaimWelcomePromoCodeClick} />
      ) : null}
    </InformationalPageTemplate>
  )
}
