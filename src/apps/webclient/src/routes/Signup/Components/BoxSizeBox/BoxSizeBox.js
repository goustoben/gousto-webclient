import React from 'react'

import Image from 'Image'
import classNames from 'classnames'
import { Button, Loader } from 'goustouicomponents'
import Immutable from 'immutable'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'

import { signupConfig } from 'config/signup'

import { DiscountAppliedNotice } from '../DiscountAppliedNotice/DiscountAppliedNotice'

import css from './BoxSizeBox.css'

const BoxSizeBox = ({
  numPortionChange,
  numPortionChangeTracking,
  next,
  numPersons,
  boxPrices,
}) => {
  const boxType = signupConfig.boxSizeStep.boxSize[numPersons]
  const isPromoCodeApplied = boxPrices && boxPrices.get('promoCodeValid')
  const recipeTotal = boxPrices && boxPrices.get('recipeTotal')
  const total = isPromoCodeApplied ? boxPrices.get('recipeTotalDiscounted') : recipeTotal
  const isLoading = !total

  const renderPrices = () => (
    <div className={css.portionsSign}>
      <span className={css.price}>£{total || ''}</span>
      {isPromoCodeApplied && <span className={css.redPrice}>£{recipeTotal || ''}</span>}
      <span className={css.priceText}>&nbsp;per box</span>
    </div>
  )

  const clickPortionButton = () => {
    numPortionChange(numPersons)
    numPortionChangeTracking(numPersons)
    next()
  }

  return (
    <div className={css.container}>
      <div className={css.imageContainer}>
        <Image media={boxType.image} size={0} />
      </div>
      <div className={css.boxWrapper}>
        <h2 className={css.title}>
          {numPersons}
          &nbsp;people
        </h2>
        <p className={css.subtitle}>{boxType.description}</p>
        <div
          className={classNames(css.priceContainer, { [css.discountApplied]: isPromoCodeApplied })}
        >
          <p className={css.priceText}>from</p>
          {isLoading ? (
            <div className={css.loading}>
              <Loader color="Bluecheese" />
            </div>
          ) : (
            renderPrices()
          )}
        </div>
        {isPromoCodeApplied && <DiscountAppliedNotice />}
        <Button
          width="full"
          data-testing={`signupBoxSize${numPersons}Portions`}
          onClick={clickPortionButton}
        >
          {signupConfig.boxSizeStep.cta}
        </Button>
      </div>
    </div>
  )
}

BoxSizeBox.propTypes = {
  numPortionChange: PropTypes.func.isRequired,
  numPortionChangeTracking: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  numPersons: PropTypes.number.isRequired,
  boxPrices: ImmutablePropTypes.contains({
    promoCodeValid: PropTypes.bool,
    recipeTotalDiscounted: PropTypes.string,
    recipeTotal: PropTypes.string,
  }),
}

BoxSizeBox.defaultProps = {
  boxPrices: Immutable.Map({}),
}

export { BoxSizeBox }
