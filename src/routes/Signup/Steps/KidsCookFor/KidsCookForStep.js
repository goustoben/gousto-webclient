import PropTypes from 'prop-types'
import React from 'react'
import Button from '../../Button'
import css from '../../Signup.css'

import Image from '../../Image'

const KidsCookForStep = ({ cookForKidsChange, next }) => (
  <div className={css.fullWidth}>
    <div className={css.header}>
      <Image name="cooking-for-children" />
      <h1 className={css.heading}>Do you cook for any children?</h1>
    </div>
    <div className={css.body}>
      <div className={css.containerFluid}>
        <div className={css.row}>
          <div className={css.left}>
            <Button
              fill={false}
              width="full"
              onClick={() => { cookForKidsChange(true); next() }}
            >
              Yes
            </Button>
          </div>
          <div className={css.right}>
            <Button
              fill={false}
              width="full"
              onClick={() => { cookForKidsChange(false); next() }}
            >
              No
            </Button>
          </div>
        </div>
      </div>
      <p className={css.bodyText}>This information helps us to give you relevant gifts, stories and ideas.</p>
    </div>
  </div>
)

KidsCookForStep.propTypes = {
  cookForKidsChange: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
}

export default KidsCookForStep
