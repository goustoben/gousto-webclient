import PropTypes from 'prop-types'
import React from 'react'
import actual from 'actual'
import TextInput from 'Form/Input'
import {reminder} from 'config/freeDelivery'
import Button from '../../Button'
import Image from '../../Image'
import postcodeCss from './PostcodeStep.css'
import css from '../../Signup.css'

class PostcodeStep extends React.PureComponent {

  state = {
    postcodeAutoFocus: false,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active) {
      if (__CLIENT__ && actual('width', 'px') > 1024) {
        setTimeout(() => {
          this.setState({
            postcodeAutoFocus: true,
          })
        }, 600)
      }
    }
  }

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
      <span className={css.stepContainer} data-testing="signupPostcodeStep">
        <div className={css.fullWidth}>
          <div className={css.header}>
            <Image name="where-to-deliver" />
            <h1 className={css.heading}>Where would you like your box delivered?</h1>
          </div>
          <div className={css.body}>
            <div className={postcodeCss.inputContainer}>
              <form onSubmit={e => { if (e) { e.preventDefault() } changePostcode(tempPostcode, nextStepName) }} action="#" className={postcodeCss.row}>
                <div className={postcodeCss.left}>
                  <TextInput
                    isFixed
                    autoFocus={this.state.postcodeAutoFocus}
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
                <div className={postcodeCss.right}>
                  <Button
                    disabled={tempPostcode.length < 5}
                    data-testing="signupPostcodeCTAMobile"
                    onClick={() => {
                      changePostcode(tempPostcode, nextStepName)
                    }}
                    pending={postcodePending}
                    width="full"
                  />
                </div>
              </form>
            </div>
            <p className={deliveryDaysError ? postcodeCss.errorText : postcodeCss.bodyText}>{
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
          <div className={css.inputContainer}>
            <Button
              className={postcodeCss.xsMaxHidden}
              disabled={tempPostcode.length < 5}
              data-testing="signupPostcodeCTADesktop"
              onClick={() => {
                changePostcode(tempPostcode, nextStepName)
              }}
              pending={postcodePending}
              width="full"
            />
          </div>
        </div>
      </span>
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
  currentStepName: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  active: PropTypes.bool,
}

export default PostcodeStep
