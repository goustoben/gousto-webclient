import PropTypes from 'prop-types'
import React from 'react'

import classNames from 'classnames'
import Immutable from 'immutable'
import config from 'config/signup'
import { Heading } from 'goustouicomponents'
import { Button } from '../../Button'
import { BoxSizeBox } from '../../Components/BoxSizeBox/BoxSizeBox'
import css from './BoxSizeStep.css'
import signupCss from '../../Signup.css'

import { Image } from '../../Image'

const BoxSizeStep = ({ numPortionChange, numPortionChangeTracking, next, isPricingClarityEnabled, menuBoxPrices }) => {
  const portions = [2, 4]

  const renderButtons = () => (portions.map((value, index) => (
    <div className={index % 2 === 0 ? css.left : css.right} key={`${value}_portions`}>
      <Button
        data-testing={`signupBoxSize${value}Portions`}
        fill={false}
        onClick={() => { numPortionChange(value); numPortionChangeTracking(value); next() }}
        width="full"
      >
        {`${value} People`}
      </Button>
    </div>
  )))

  const renderBody = () => (
    <div className={signupCss.body}>
      <div className={css.container}>
        <div className={css.row}>
          {renderButtons()}
        </div>
      </div>
    </div>
  )

  const renderPricingClarityBody = () => (
    <div className={css.boxSizeContainer}>
      {portions.map(portion => (
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

  return (
    <div className={signupCss.stepContainer} data-testing="signupBoxSizeStep">
      <div className={signupCss.fullWidth}>
        <div className={signupCss.header}>
          <Heading type="h1" className={signupCss.heading}>{config.boxSizeStep.title}</Heading>
          <p className={classNames(signupCss.bodyText, { [css.subTitlePriceClarity]: isPricingClarityEnabled })}>
            {isPricingClarityEnabled ? config.boxSizeStep.subtitle : config.boxSizeStep.pricingClaritySubtitle}
          </p>
          {!isPricingClarityEnabled && <Image name="how-many-people" />}
        </div>
        {isPricingClarityEnabled ? renderPricingClarityBody() : renderBody()}
      </div>
    </div>
  )
}

BoxSizeStep.propTypes = {
  numPortionChange: PropTypes.func.isRequired,
  numPortionChangeTracking: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  isPricingClarityEnabled: PropTypes.bool,
  menuBoxPrices: PropTypes.instanceOf(Immutable.Map)
}

BoxSizeStep.defaultProps = {
  isPricingClarityEnabled: false,
  menuBoxPrices: Immutable.Map(),
}

export { BoxSizeStep }
