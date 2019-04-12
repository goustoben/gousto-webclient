import PropTypes from 'prop-types'
import React from 'react'

import Button from '../../Button'
import css from './BoxSizeStep.css'
import signupCss from '../../Signup.css'

import Image from '../../Image'

const BoxSizeStep = ({ numPortionChange, numPortionChangeTracking, next }) => {
  const portions = [2, 4]

  const renderButtons = () => (portions.map((value, index) => (<div className={index % 2 === 0 ? css.left : css.right} key={`${value}_portions_${index}`}>
    <Button
      data-testing={`signupBoxSize${value}Portions`}
      fill={false}
      onClick={() => { numPortionChange(value); numPortionChangeTracking(value); next() }}
      width="full"
    >
      {`${value} People`}
    </Button>
                                                               </div>)))

  return (
    <span className={signupCss.stepContainer} data-testing="signupBoxSizeStep">
      <div className={css.fullWidth}>
        <div className={signupCss.header}>
          <Image name="how-many-people" />
          <h1 className={signupCss.heading}>How many people do you cook for?</h1>
        </div>
        <div className={signupCss.body}>
          <div className={css.container}>
            <div className={css.row}>
              {renderButtons()}
            </div>
          </div>
          <p className={signupCss.bodyText}>You can choose 2, 3 or 4 recipes per box. Our 4-person box works for 2 adults and 2-3 children.</p>
        </div>
      </div>
    </span>
  )
}

BoxSizeStep.propTypes = {
  numPortionChange: PropTypes.func.isRequired,
  numPortionChangeTracking: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
}

export default BoxSizeStep
