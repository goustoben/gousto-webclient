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
import { clickClaimDiscountPopup, clickEnterPromoCodeManuallyContinue } from 'actions/trackingKeys'
import { InformationalPageTemplate } from 'routes/Signup/Components/InformationalPageTemplate'
import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'
import { getPromoStore, createSelectIsPendingByActionType } from 'routes/Signup/signupSelectors'
import { promo } from 'config/home'
import {
  PromoCodeCheckStatus,
  checkPromoCode,
  proceedWithPromoCode,
} from './enterPromoCodeManuallyUtils'
import css from './EnterPromoCodeManuallyPage.css'

const DEBOUNCE_MS = 500

type SuccessSectionProps = {
  promoCodeCampaignTextHtml: string | null
}

/* eslint-disable react/no-danger */
export const SuccessSection = ({ promoCodeCampaignTextHtml }: SuccessSectionProps) => (
  <>
    <Heading5>You got a discount!</Heading5>
    {promoCodeCampaignTextHtml ? (
      <div
        dangerouslySetInnerHTML={{ __html: promoCodeCampaignTextHtml }}
        className={css.promoCodeCampaignText}
      />
    ) : (
      <>
        <p>Your discount will be automatically applied to your account.</p>
        <p>Happy cooking!</p>
      </>
    )}
  </>
)

export const FailureSection = () => {
  const isTwoMonthPromoCodeEnabled = useIsOptimizelyFeatureEnabled(
    'beetroots_two_month_promo_code_web_enabled',
  )
  const lines = isTwoMonthPromoCodeEnabled
    ? promo.twoMonthDescriptionLines
    : promo.defaultDescriptionLines

  const dispatch = useDispatch()

  const handleClick = () => {
    const promoCode = isTwoMonthPromoCodeEnabled ? promo.twoMonthPromoCode : promo.defaultPromoCode

    proceedWithPromoCode(dispatch, promoCode, clickClaimDiscountPopup)
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

/**
 * Get the "status" prop of citrus/InputField so that the input field looks
 * correct according to the status of the promo code check; see
 * citrus/Input/AppearanceProps.
 */
const getFormFieldStatus = (status: PromoCodeCheckStatus) => {
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
  const [status, setStatus] = useState<PromoCodeCheckStatus>('empty')
  const [campaignTextHtml, setCampaignTextHtml] = useState<string | null>(null)

  const dispatch = useDispatch()

  const promoStore = useSelector(getPromoStore)

  const isPending = useSelector(createSelectIsPendingByActionType(actionTypes.PROMO_GET))

  const previousIsPending = usePrevious(isPending)
  const previousCheckedValue = usePrevious(checkedValue)

  const handleContinueClick = () => {
    const promoCode = checkedValue
    proceedWithPromoCode(dispatch, promoCode, clickEnterPromoCodeManuallyContinue, {
      accepted: true,
    })
  }

  const [_isReady, cancel] = useDebounce(
    () => {
      setCheckedValue(valueUnderInput)
    },
    DEBOUNCE_MS,
    [valueUnderInput],
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

  // When component unmounts, stop the debounce timer so the request to check
  // doesn't happen, so the follow-up state updates don't happen.
  useEffect(
    () => () => {
      cancel()
    },
    [cancel],
  )

  return (
    <InformationalPageTemplate
      testingSelector="enterPromoCodeManuallyPage"
      headerText="Enter your discount code!"
      headerSize="fontStyle2XL"
      hasSmallerMarginBelowHeader
    >
      <div className={css.inputFieldContainer}>
        <InputField
          id="enterPromoCodeManuallyInputField"
          data-testid="enterPromoCodeManuallyInputField"
          label=""
          placeholder="45-56-69"
          status={getFormFieldStatus(status)}
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
