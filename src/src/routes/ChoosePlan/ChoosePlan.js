import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { Button } from 'goustouicomponents'
import css from './ChoosePlan.css'

const propTypes = {
  choosePlanContinue: PropTypes.func,
}

const ChoosePlan = ({ choosePlanContinue }) => (
  <div className={css.choosePlanPage}>
    <Helmet
      style={[{
        cssText: `
          #react-root {
            height: 100%;
          }
        `,
      }]}
    />
    <div className={css.choosePlanWrapper}>
      <h1 className={css.title}>Your Gousto plan</h1>
      <p className={css.subtitle}>Get a box delivered every week at a discounted price, or try a one-off box.</p>
      <div className={css.continueCTA}>
        <Button onClick={choosePlanContinue} width='full'>Continue</Button>
      </div>
    </div>
  </div>
)

ChoosePlan.propTypes = propTypes

export { ChoosePlan }
