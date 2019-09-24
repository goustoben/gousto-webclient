import React from 'react'
import Helmet from 'react-helmet'
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
    <div className={css.choosePlanWrapper}>hello woorld</div>
  </div>
)

export { ChoosePlan }
