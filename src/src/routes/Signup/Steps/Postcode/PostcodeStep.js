import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import TextInput from 'Form/Input'
import { signupConfig } from 'config/signup'
import { Heading } from 'goustouicomponents'
import { PostcodeStepMessage } from './PostcodeStepMessage'
import { Button } from '../../Button'
import { Image } from '../../Image'
import postcodeCss from './PostcodeStep.css'
import css from '../../Signup.css'

class PostcodeStep extends PureComponent {
  handleClick = () => {
    const { tempPostcode, nextStepName, changePostcode, signupGetCountByPostcode } = this.props

    signupGetCountByPostcode(tempPostcode)
    changePostcode(tempPostcode, nextStepName)
  }

  render() {
    const {
      tempPostcode,
      changeTempPostcode,
      postcodePending,
      deliveryDaysError,
      isGoustoOnDemandEnabled,
      isWizardWithoutImagesEnabled,
    } = this.props

    return (
      <div className={css.stepContainer} data-testing="signupPostcodeStep">
        <div className={css.fullWidth}>
          <div
            className={classNames(css.header, {
              [css.wizardWithoutImagesHeader]: isWizardWithoutImagesEnabled,
            })}
          >
            <Heading type="h1">
              {isGoustoOnDemandEnabled
                ? signupConfig.postCodeStep.goustoOnDemandTitle
                : signupConfig.postCodeStep.title}
            </Heading>
            {!isWizardWithoutImagesEnabled && <Image name="where-to-deliver" />}
          </div>
          <div
            className={classNames(css.body, {
              [postcodeCss.wizardWithoutImagesBody]: isWizardWithoutImagesEnabled,
            })}
          >
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
                <div
                  className={classNames(postcodeCss.container, {
                    [postcodeCss.wizardWithoutImagesContainer]: isWizardWithoutImagesEnabled,
                  })}
                >
                  <div
                    className={classNames(postcodeCss.postcodeContainer, {
                      [postcodeCss.wizardWithoutImagesCodeContainer]: isWizardWithoutImagesEnabled,
                    })}
                  >
                    <div className={postcodeCss.postcodeLabel}>Postcode</div>
                    <TextInput
                      isFixed
                      placeholder="e.g. W3 7UP"
                      onChange={changeTempPostcode}
                      minLength={5}
                      maxLength={8}
                      value={tempPostcode}
                      mask
                      dataTesting="signupPostcodeInput"
                      isInCheckout
                      error={deliveryDaysError}
                      autoComplete="postal-code"
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
              isWizardWithoutImagesEnabled={isWizardWithoutImagesEnabled}
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
  changePostcode: PropTypes.func.isRequired,
  nextStepName: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isGoustoOnDemandEnabled: PropTypes.bool,
  signupGetCountByPostcode: PropTypes.func.isRequired,
  isWizardWithoutImagesEnabled: PropTypes.bool,
}

PostcodeStep.defaultProps = {
  deliveryDaysError: '',
  postcodePending: false,
  tempPostcode: '',
  changeTempPostcode: () => {},
  nextStepName: '',
  isGoustoOnDemandEnabled: false,
  isWizardWithoutImagesEnabled: false,
}

export { PostcodeStep }
