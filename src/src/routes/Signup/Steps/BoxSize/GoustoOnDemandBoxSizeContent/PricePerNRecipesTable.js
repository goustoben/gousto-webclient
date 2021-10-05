import React from 'react'
import PropTypes from 'prop-types'
import { Loader } from 'goustouicomponents'
import { BoxDescriptorsPropType } from 'routes/BoxPrices/boxPricesPropTypes'
import { formatPrice } from 'routes/Signup/signupUtils'
import css from './PricePerNRecipesTable.css'

export const PricePerNRecipesTable = ({ isLoadingPrices, boxDescriptors }) => (
  <div className={css.pricesPerRecipesTableContainer}>
    <div className={css.row}>
      {isLoadingPrices ? (
        <Loader color="Bluecheese" />
      ) : (
        boxDescriptors.map((boxDescriptor) => {
          const nRecipes = boxDescriptor.num_portions
          const { totalAfterDiscount } = boxDescriptor
          const totalBeforeDiscount = boxDescriptor.total

          const isDiscounted = totalAfterDiscount !== totalBeforeDiscount

          return (
            <div className={css.cell} key={nRecipes}>
              <div className={css.nRecipesLine}>{nRecipes} recipes</div>
              <div className={css.priceLine}>{formatPrice(totalAfterDiscount)}</div>
              <div className={css.priceBeforeDiscountLine}>
                {isDiscounted && formatPrice(totalBeforeDiscount)}
              </div>
            </div>
          )
        })
      )}
    </div>
  </div>
)

PricePerNRecipesTable.propTypes = {
  isLoadingPrices: PropTypes.bool.isRequired,
  boxDescriptors: BoxDescriptorsPropType,
}

PricePerNRecipesTable.defaultProps = {
  boxDescriptors: null,
}
