import PropTypes from 'prop-types'
import React from 'react'

import classNames from 'classnames'
import Immutable from 'immutable'
import { signupConfig } from 'config/signup'
import { Heading } from 'goustouicomponents'
import { Button } from '../../Button'
import { BoxSizeBox } from '../../Components/BoxSizeBox/BoxSizeBox'
import { PricePerServing } from '../../PricePerServing/PricePerServing'
import css from './BoxSizeStep.css'
import signupCss from '../../Signup.css'

import { Image } from '../../Image'

const BoxSizeStep = ({
  numPortionChange,
  numPortionChangeTracking,
  next,
  isPricingClarityEnabled,
  menuBoxPrices,
  lowestPricePerPortion,
  isWizardPricePerServingEnabled,
}) => {
  const portions = [2, 4]

  const renderButtons = () =>
    portions.map((value, index) => (
      <div className={index % 2 === 0 ? css.left : css.right} key={`${value}_portions`}>
        <Button
          data-testing={`signupBoxSize${value}Portions`}
          fill={false}
          onClick={() => {
            numPortionChange(value)
            numPortionChangeTracking(value)
            next()
          }}
          width="full"
        >
          {`${value} People`}
        </Button>
      </div>
    ))

  const renderBody = () => (
    <div className={signupCss.body}>
      <div className={css.container}>
        <div className={css.row}>{renderButtons()}</div>
      </div>
    </div>
  )

  const renderPricingClarityBody = () => (
    <div className={css.boxSizeContainer}>
      {portions.map((portion) => (
        <BoxSizeBox
          numPortionChange={numPortionChange}
          numPortionChangeTracking={numPortionChangeTracking}
          next={next}
          numPersons={portion}
          key={`${portion}-portion`}
          boxPrices={menuBoxPrices.getIn([portion.toString(), '2', 'gourmet'])}
        />
      ))}
    </div>
  )

  const renderPricePerServing = () => {
    if (!isWizardPricePerServingEnabled || !Object.keys(lowestPricePerPortion).length) {
      return null
    }

    const { forTwo, forFour } = lowestPricePerPortion
    const onClickHandler = (portion) => {
      numPortionChange(portion)
      numPortionChangeTracking(portion)
      next()
    }
    const priceList = [
      { portion: 2, image: 'per-two-people', cost: forTwo },
      { portion: 4, image: 'per-four-people', cost: forFour },
    ]

    return (
      <div className={css.pricePerServingRowWrapper}>
        <div className={css.pricePerServingRow}>
          {priceList.map(({ portion, image, cost }) => (
            <PricePerServing
              onClick={() => onClickHandler(portion)}
              key={`price-${portion}`}
              portion={portion}
              image={image}
              cost={cost}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={signupCss.stepContainer} data-testing="signupBoxSizeStep">
      <div className={signupCss.fullWidth}>
        <div className={signupCss.header}>
          <Heading type="h1" className={signupCss.heading}>
            {signupConfig.boxSizeStep.title}
          </Heading>
          <p
            className={classNames(signupCss.bodyText, {
              [css.subTitlePriceClarity]: isPricingClarityEnabled,
            })}
          >
            {isPricingClarityEnabled
              ? signupConfig.boxSizeStep.subtitle
              : signupConfig.boxSizeStep.pricingClaritySubtitle}
          </p>
          {!isPricingClarityEnabled && !isWizardPricePerServingEnabled && (
            <Image name="how-many-people" />
          )}
          {renderPricePerServing()}
        </div>
        {!isWizardPricePerServingEnabled && isPricingClarityEnabled && renderPricingClarityBody()}
        {!isWizardPricePerServingEnabled && !isPricingClarityEnabled && renderBody()}
      </div>
    </div>
  )
}

BoxSizeStep.propTypes = {
  numPortionChange: PropTypes.func.isRequired,
  numPortionChangeTracking: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  isPricingClarityEnabled: PropTypes.bool,
  menuBoxPrices: PropTypes.instanceOf(Immutable.Map),
  lowestPricePerPortion: PropTypes.objectOf(PropTypes.object),
  isWizardPricePerServingEnabled: PropTypes.bool,
}

BoxSizeStep.defaultProps = {
  isPricingClarityEnabled: false,
  menuBoxPrices: Immutable.Map(),
  lowestPricePerPortion: {},
  isWizardPricePerServingEnabled: false,
}

export { BoxSizeStep }
