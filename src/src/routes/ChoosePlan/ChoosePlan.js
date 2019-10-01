import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { Button } from 'goustouicomponents'
import { PlanOption } from './PlanOption'
import css from './ChoosePlan.css'

const subOption = {
  title: 'A box a week',
  totalPrice: '47.75',
  totalPriceDiscounted: '23.88',
  pricePerPortion: '2.98',
  priceBoxTypeMessage: 'For first box'
}

const flexOption = {
  title: 'One-off box',
  totalPrice: '47.75',
  pricePerPortion: '5.97',
  priceBoxTypeMessage: 'For one box'
}

const propTypes = {
  choosePlanContinue: PropTypes.func
}

const ChoosePlan = ({ choosePlanContinue }) => (
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
        handleSelect={
          () => console.log('Hi, you clicked Option 2') /*eslint-disable-line*/
        }
      />
      <Button onClick={choosePlanContinue} width="full">
        Continue
      </Button>
    </div>
  </div>
)

ChoosePlan.propTypes = propTypes

export { ChoosePlan }
