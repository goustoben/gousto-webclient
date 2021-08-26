import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import TextInput from 'Form/Input'
import { signupConfig } from 'config/signup'
import { Heading } from 'goustouicomponents'
import { PostcodeStepMessage } from './PostcodeStepMessage'
import { Button } from '../../Button'
import { Image } from '../../Image'
import { getDataForSocialBelonging } from '../signupUtils'
import postcodeCss from './PostcodeStep.css'
import css from '../../Signup.css'

class PostcodeStep extends PureComponent {
  handleClick = () => {
    const { tempPostcode, nextStepName, changePostcode, isSocialBelongingEnabled } = this.props
    const socialBelongingData = isSocialBelongingEnabled
      ? getDataForSocialBelonging(tempPostcode.replace(' ', ''))
      : null

    changePostcode(tempPostcode, nextStepName, socialBelongingData)
  }

  render() {
    const {
      tempPostcode,
      changeTempPostcode,
      postcodePending,
      deliveryDaysError,
      isGoustoOnDemandEnabled,
    } = this.props

    return (
      <div className={css.stepContainer} data-testing="signupPostcodeStep">
        <div className={css.fullWidth}>
          <div className={css.header}>
            <Heading type="h1">
              {isGoustoOnDemandEnabled
                ? signupConfig.postCodeStep.goustoOnDemandTitle
                : signupConfig.postCodeStep.title}
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
                  this.handleClick()
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
                    onClick={this.handleClick}
                    pending={postcodePending}
                    width="full"
                  >
                    Continue
                  </Button>
                </div>
              </form>
            </div>
            <PostcodeStepMessage
              deliveryDaysError={deliveryDaysError}
              isGoustoOnDemandEnabled={isGoustoOnDemandEnabled}
            />
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
  isSocialBelongingEnabled: PropTypes.bool,
  isGoustoOnDemandEnabled: PropTypes.bool,
}

PostcodeStep.defaultProps = {
  deliveryDaysError: false,
  postcodePending: false,
  tempPostcode: '',
  changeTempPostcode: () => {},
  changePostcode: () => {},
  nextStepName: '',
  isSocialBelongingEnabled: false,
  isGoustoOnDemandEnabled: false,
}

export { PostcodeStep }
