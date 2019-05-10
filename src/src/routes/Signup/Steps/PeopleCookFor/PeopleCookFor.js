import PropTypes from 'prop-types'
import React from 'react'
import { Segment } from 'goustouicomponents'
import Button from '../../Button'

import css from './PeopleCookFor.css'
import signupCss from '../../Signup.css'

import Image from '../../Image'

const PeopleCookFor = ({ header, text, numPeopleChange, next }) => {
  const buttonsSequence = Array.from(new Array(4), (val, index) => index + 1)

  return (
    <span className={signupCss.stepContainer}>
      <div>
        <div className={signupCss.header}>
          <Image name="how-many-people" />
          <h1 className={signupCss.heading}>{header}</h1>
        </div>
        <div className={signupCss.body}>
          <div className={css.container}>
            {buttonsSequence.map(el => (<div key={el} className={css.button}>
              <Button
                fill={false}
                width="full"
              >
                <Segment
                  fill={false}
                  onClick={() => {
                    numPeopleChange(el)
                    next()
                  }}
                >
                  {el}
                </Segment>
              </Button>
                                  </div>))}
          </div>
          <div className={css.link}>
            <span
              onClick={() => {
                numPeopleChange(5)
                next()
              }}
            >
              I cook for 5 or more
            </span>
          </div>
          <p className={signupCss.bodyText}>{text}</p>
        </div>
      </div>
    </span>
  )
}

PeopleCookFor.propTypes = {
  header: PropTypes.string,
  text: PropTypes.string,
  numPeopleChange: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
}

export default PeopleCookFor
