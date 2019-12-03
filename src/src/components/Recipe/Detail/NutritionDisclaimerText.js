import React from 'react'
import classnames from 'classnames'

import css from 'Recipe/Detail/DefaultDetail/DefaultDetail.css'

const NutritionDisclaimerText = () => (
    <div className={classnames(css.extraNutritionalInformation && css.extraInfoMargins)}>
      <span>&#42;Gousto’s nutritional information only applies to ingredients supplied by Gousto. The cooking process and additional ingredients added at home (listed under “What you’ll need”) will affect total values.</span>
    </div>
)

export { NutritionDisclaimerText }
