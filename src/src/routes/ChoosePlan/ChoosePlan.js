import React from 'react'
import Helmet from 'react-helmet'
import { Button } from 'goustouicomponents'
import css from './ChoosePlan.css'

const ChoosePlan = () => (
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
        <Button width='full'>Continue</Button>
      </div>
    </div>
  </div>
)

export { ChoosePlan }
