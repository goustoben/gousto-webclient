import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useDebounce, usePrevious } from 'react-use'
import {
  Button,
  InputField,
  FormFieldStatus,
  Space,
  Heading5,
  Paragraph,
  Join,
} from '@gousto-internal/citrus-react'
import { actionTypes } from 'actions/actionTypes'
import { redirect } from 'actions/redirect'
import { trackUTMAndPromoCode } from 'actions/tracking'
import { clickClaimDiscountPopup, clickEnterPromoCodeManuallyContinue } from 'actions/trackingKeys'
import { basketPromoCodeChange } from 'actions/basket'
import { InformationalPageTemplate } from 'routes/Signup/Components/InformationalPageTemplate'
import { promoChange } from 'actions/promos'
import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'
import { getPromoStore, createSelectIsPendingByActionType } from 'routes/Signup/signupSelectors'
import { promo } from 'config/home'
import { Status, checkPromoCode } from './enterPromoCodeManuallyUtils'
import css from './EnterPromoCodeManuallyPage.css'

const DEBOUNCE_MS = 500

/* eslint-disable react/no-danger */
export const SuccessSection = ({ promoCodeCampaignTextHtml }: any) => (
  <>
    <Heading5>You got a discount!</Heading5>
    <div
      dangerouslySetInnerHTML={{ __html: promoCodeCampaignTextHtml }}
      className={css.promoCodeCampaignText}
    />
  </>
)

export const FailureSection = () => {
  const isTwoMonthPromoCodeEnabled = useIsOptimizelyFeatureEnabled(
    'beetroots_two_month_promo_code_web_enabled'
  )
  const lines = isTwoMonthPromoCodeEnabled
    ? promo.twoMonthDescriptionLines
    : promo.defaultDescriptionLines

  const dispatch = useDispatch()

  const handleClick = () => {
    const promoCode = isTwoMonthPromoCodeEnabled ? promo.twoMonthPromoCode : promo.defaultPromoCode

    dispatch(trackUTMAndPromoCode(clickClaimDiscountPopup))
    dispatch(promoChange(promoCode))
    dispatch(basketPromoCodeChange(promoCode))
    dispatch(redirect('/signup'))
  }

  return (
    <>
      <Space size={6} />
      <Heading5>Claim our welcome discount instead!</Heading5>
      <Space size={2} />
      <Join with={<Space size={4} />}>
        {lines.map((line, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Paragraph key={index} size={2}>
            {line}
          </Paragraph>
        ))}
      </Join>

      <Space size={4} />
      <Button height={48} width="100%" onClick={handleClick}>
        Claim welcome discount
      </Button>
    </>
  )
}

const getFormStatus = (status: Status) => {
  switch (status) {
    case 'empty':
      return undefined
    case 'success':
      return FormFieldStatus.Success
    default:
      return FormFieldStatus.Error
  }
}

export const EnterPromoCodeManuallyPage = () => {
  const [valueUnderInput, setValueUnderInput] = useState('')
  const [checkedValue, setCheckedValue] = useState('')
  const [status, setStatus] = useState<Status>('empty')
  const [campaignTextHtml, setCampaignTextHtml] = useState<string | null>(null)

  const dispatch = useDispatch()

  const promoStore = useSelector(getPromoStore)

  const isPending = useSelector(createSelectIsPendingByActionType(actionTypes.PROMO_GET))

  const previousIsPending = usePrevious(isPending)
  const previousCheckedValue = usePrevious(checkedValue)

  const handleContinueClick = () => {
    const promoCode = checkedValue

    dispatch(
      trackUTMAndPromoCode(clickEnterPromoCodeManuallyContinue, {
        accepted: true,
        promoCode,
      })
    )
    dispatch(promoChange(promoCode))
    dispatch(basketPromoCodeChange(promoCode))
    dispatch(redirect('/signup'))
  }

  const [_isReady, cancel] = useDebounce(
    () => {
      setCheckedValue(valueUnderInput)
    },
    DEBOUNCE_MS,
    [valueUnderInput]
  )

  useEffect(() => {
    if (previousIsPending !== isPending || previousCheckedValue !== checkedValue) {
      checkPromoCode(checkedValue, isPending, dispatch, promoStore, setStatus, setCampaignTextHtml)
    }
  }, [
    previousIsPending,
    isPending,
    previousCheckedValue,
    checkedValue,
    dispatch,
    promoStore,
    setStatus,
  ])

  useEffect(
    () => () => {
      cancel()
    },
    [cancel]
  )

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
          status={getFormStatus(status)}
          validationMessage={status === 'error' ? 'This discount code is not valid.' : undefined}
          value={valueUnderInput}
          onChange={(event) => {
            const eventValue = event.target.value
            setValueUnderInput(eventValue.toUpperCase())
          }}
        />
      </div>
      <Space size={4} />
      {status === 'success' ? (
        <SuccessSection promoCodeCampaignTextHtml={campaignTextHtml} />
      ) : null}
      <Button
        height={48}
        width="100%"
        disabled={status !== 'success'}
        onClick={handleContinueClick}
      >
        Continue
      </Button>
      {status === 'error' ? <FailureSection /> : null}
    </InformationalPageTemplate>
  )
}
