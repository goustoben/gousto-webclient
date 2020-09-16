import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import TextInput from 'Form/Input'
import {reminder} from 'config/freeDelivery'
import config from 'config/signup'
import { Heading } from 'goustouicomponents'
import { Button } from '../../Button'
import { Image } from '../../Image'
import postcodeCss from './PostcodeStep.css'
import css from '../../Signup.css'

class PostcodeStep extends React.PureComponent {
  render() {
    const {
      tempPostcode,
      changeTempPostcode,
      postcodePending,
      changePostcode,
      deliveryDaysError,
      nextStepName,
      isPricingClarityEnabled
    } = this.props

    return (
      <div className={classNames(css.stepContainer, { [postcodeCss.pricingClarityRedesign]: isPricingClarityEnabled })} data-testing="signupPostcodeStep">
        <div className={css.fullWidth}>
          <div className={css.header}>
            <Heading type="h1" className={css.heading}>{config.postCodeStep.title}</Heading>
            {!isPricingClarityEnabled && <Image name="where-to-deliver" />}
          </div>
          <div className={css.body}>
            <div className={postcodeCss.inputContainer}>
              <form onSubmit={e => { if (e) { e.preventDefault() } changePostcode(tempPostcode, nextStepName) }} action="#" className={postcodeCss.row}>
                <div className={postcodeCss.left}>
                  <TextInput
                    isFixed
                    placeholder="e.g. W3 7UP"
                    onChange={changeTempPostcode}
                    color={deliveryDaysError ? 'primary' : 'secondary'}
                    minLength={5}
                    maxLength={8}
                    textAlign="center"
                    value={tempPostcode.toUpperCase()}
                    mask
                    data-testing="signupPostcodeInput"
                  />
                </div>
              </form>
            </div>
            <p className={deliveryDaysError ? postcodeCss.errorText : postcodeCss.bodyText}>
              {!deliveryDaysError && <span className={postcodeCss.tick} />}
              {
                (() => {
                  let textMsg

                  if (deliveryDaysError) {
                    if (deliveryDaysError === 'do-not-deliver') {
                      textMsg = 'Sorry, it looks like we don\'t currently deliver to your area.'
                    } else {
                      textMsg = 'Please enter a valid postcode'
                    }
                  } else {
                    textMsg = reminder
                  }

                  return textMsg
                })()
              }
            </p>
          </div>
        </div>
        <div className={css.footer}>
          <div className={classNames(css.inputContainer, { [postcodeCss.pricingClarityInput]: isPricingClarityEnabled })}>
            <Button
              disabled={tempPostcode.length < 5}
              data-testing="signupPostcodeCTA"
              onClick={() => {
                changePostcode(tempPostcode, nextStepName)
              }}
              pending={postcodePending}
              width="full"
            />
          </div>
        </div>
      </div>
    )
  }
}

PostcodeStep.propTypes = {
  deliveryDaysError: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.object,
  ]),
  postcodePending: PropTypes.bool,
  tempPostcode: PropTypes.string,
  changeTempPostcode: PropTypes.func,
  changePostcode: PropTypes.func,
  nextStepName: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  isPricingClarityEnabled: PropTypes.bool
}

PostcodeStep.defaultProps = {
  deliveryDaysError: false,
  postcodePending: false,
  tempPostcode: '',
  changeTempPostcode: () => {},
  changePostcode: () => {},
  nextStepName: '',
  isPricingClarityEnabled: false
}

export { PostcodeStep }
