import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import TextInput from 'Form/Input'
import Svg from 'Svg'
import { signupConfig } from 'config/signup'
import { Heading } from 'goustouicomponents'
import { Button } from '../../Button'
import { Image } from '../../Image'
import postcodeCss from './PostcodeStep.css'
import css from '../../Signup.css'

class PostcodeStep extends PureComponent {
  render() {
    const {
      tempPostcode,
      changeTempPostcode,
      postcodePending,
      changePostcode,
      deliveryDaysError,
      nextStepName,
    } = this.props

    return (
      <div className={css.stepContainer} data-testing="signupPostcodeStep">
        <div className={css.fullWidth}>
          <div className={css.header}>
            <Heading type="h1" className={css.heading}>
              {signupConfig.postCodeStep.title}
            </Heading>
            <Image name="where-to-deliver" />
          </div>
          <div className={css.body}>
            <div className={postcodeCss.inputContainer}>
              <form
                onSubmit={(e) => {
                  if (e) {
                    e.preventDefault()
                  }
                  changePostcode(tempPostcode, nextStepName)
                }}
                action="#"
                className={postcodeCss.row}
              >
                <div className={postcodeCss.container}>
                  <div className={postcodeCss.postcodeContainer}>
                    <div className={postcodeCss.postcodeLabel}>Postcode</div>
                    <TextInput
                      isFixed
                      placeholder="e.g. W3 7UP"
                      onChange={changeTempPostcode}
                      minLength={5}
                      maxLength={8}
                      value={tempPostcode}
                      mask
                      data-testing="signupPostcodeInput"
                      isInCheckout
                      error={deliveryDaysError}
                    />
                  </div>
                  <Button
                    disabled={tempPostcode.length < 5}
                    data-testing="signupPostcodeCTA"
                    onClick={() => {
                      changePostcode(tempPostcode, nextStepName)
                    }}
                    pending={postcodePending}
                    width="full"
                  >
                    Continue
                  </Button>
                </div>
              </form>
            </div>
            <div className={deliveryDaysError ? postcodeCss.errorText : postcodeCss.bodyText}>
              {!deliveryDaysError && (
                <Svg className={postcodeCss.tick} fileName="icon-success-tick" />
              )}
              {(() => {
                let textMsg

                if (deliveryDaysError) {
                  if (deliveryDaysError === 'do-not-deliver') {
                    textMsg = "Sorry, it looks like we don't currently deliver to your area."
                  } else {
                    textMsg = 'Please enter a valid postcode'
                  }
                } else {
                  textMsg = signupConfig.postCodeStep.reminder
                }

                return textMsg
              })()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

PostcodeStep.propTypes = {
  deliveryDaysError: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.object]),
  postcodePending: PropTypes.bool,
  tempPostcode: PropTypes.string,
  changeTempPostcode: PropTypes.func,
  changePostcode: PropTypes.func,
  nextStepName: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

PostcodeStep.defaultProps = {
  deliveryDaysError: false,
  postcodePending: false,
  tempPostcode: '',
  changeTempPostcode: () => {},
  changePostcode: () => {},
  nextStepName: '',
}

export { PostcodeStep }
