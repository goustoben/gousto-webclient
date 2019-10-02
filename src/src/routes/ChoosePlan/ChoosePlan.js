import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { Button, Alert } from 'goustouicomponents'
import { PlanOption } from './PlanOption'
import css from './ChoosePlan.css'

const subOption = {
  title: 'A box a week',
  totalPrice: '47.75',
  totalPriceDiscounted: '23.88',
  pricePerPortion: '2.98',
  priceBoxTypeMessage: 'For first box',
  benefits: [
    'Choose 4 recipes for 2 each week',
    'Cancel or pause online at any time',
    '50% off first box + 30% off all boxes in the first month',
    'Surprise gifts!'
  ]
}

const flexOption = {
  title: 'One-off box',
  totalPrice: '47.75',
  pricePerPortion: '5.97',
  priceBoxTypeMessage: 'For one box',
  benefits: [
    'Choose  a single box of 4 recipes for 2 people',
    'One off price, no weekly plan'
  ]
}

const propTypes = {
  choosePlanContinue: PropTypes.func,
  extrasIncluded: PropTypes.bool,
}

const ChoosePlan = ({ choosePlanContinue, extrasIncluded }) => (
  <div className={css.choosePlanPage}>
    <Helmet
      style={[
        {
          cssText: `
          #react-root {
            height: 100%;
          }
        `
        }
      ]}
    />
    <div className={css.choosePlanWrapper}>
      <h1 className={css.title}>Your Gousto plan</h1>
      <p className={css.subtitle}>
        Get a box delivered every week at a discounted price, or try a one-off
        box.
      </p>
      <PlanOption
        title={subOption.title}
        totalPrice={subOption.totalPrice}
        totalPriceDiscounted={subOption.totalPriceDiscounted}
        pricePerPortion={subOption.pricePerPortion}
        priceBoxTypeMessage={subOption.priceBoxTypeMessage}
        benefits={subOption.benefits}
        showExclExtras={extrasIncluded}
        handleSelect={
          () => console.log('Option 1 clicked!') /*eslint-disable-line*/
        }
      />
      <PlanOption
        selected
        title={flexOption.title}
        totalPrice={flexOption.totalPrice}
        pricePerPortion={flexOption.pricePerPortion}
        priceBoxTypeMessage={flexOption.priceBoxTypeMessage}
        benefits={flexOption.benefits}
        showExclExtras={extrasIncluded}
        handleSelect={
          () => console.log('Hi, you clicked Option 2') /*eslint-disable-line*/
        }
      />
      {
        extrasIncluded &&
        <Alert type="info">
          The prices shown above don&#39;t include optional extras, such as premium delivery or premium recipe surcharges.
        </Alert>
      }
      <Button onClick={choosePlanContinue} width="full">
        Continue
      </Button>
    </div>
  </div>
)

ChoosePlan.propTypes = propTypes

export { ChoosePlan }
