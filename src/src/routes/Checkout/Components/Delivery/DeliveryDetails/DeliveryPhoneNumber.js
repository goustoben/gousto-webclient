import PropTypes from 'prop-types'
import React from 'react'
import { Field } from 'redux-form'
import classNames from 'classnames'
import ReduxFormInput from 'Form/ReduxFormInput'
import css from '../Delivery.css'
import redesignCss from '../../../CheckoutRedesignContainer.css'

class DeliveryPhoneNumber extends React.PureComponent {
  /**
   * object containing pressed keys
   * @type {{}}
   */
  keys = {}

  constructor(props) {
    super(props)

    this.state = {
      addZero: false,
    }
  }

  /**
   * except for 'a', 'c', 'v', 'x', 'y', 'z'
   * @param keyCode
   */
  isForbiddenLetter = (keyCode) =>
    keyCode === 66 || (keyCode >= 68 && keyCode <= 85) || keyCode === 87

  /**
   * 'a', 'c', 'v', 'x', 'y', 'z'
   * @param keyCode
   */
  isAllowedLetter = (keyCode) =>
    keyCode === 65 || keyCode === 67 || keyCode === 86 || (keyCode >= 88 && keyCode <= 90)

  /**
   * space, semi-colon, equal sign, comma, dash, period, forward slash, grave accent, open bracket, back slash, close bracket, single quote
   * @param keyCode
   */
  isForbiddenCharacter = (keyCode) =>
    keyCode === 32 || (keyCode >= 186 && keyCode <= 192) || (keyCode >= 219 && keyCode <= 222)

  isDigit = (keyCode) => (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105)

  isZero = (keyCode) => [48, 96].includes(keyCode)

  isBackspace = (keyCode) => keyCode === 8

  isCtrlMeta = (event) => event.ctrlKey || event.metaKey

  isShiftAlt = (event) => event.shiftKey || event.altKey

  handleKeyDown = (event) => {
    if (!event || !event.target) return
    const input = event.target
    const { keyCode } = event

    if (!this.keys[keyCode]) {
      this.keys[keyCode] = event
    }

    const keysArray = Object.values(this.keys)

    /**
     * cursor at the beginning of the input
     */
    if (!event.target.selectionStart || !input.value) {
      if (this.isZero(keyCode)) {
        this.setState({ addZero: true })
        event.preventDefault()
      } else if (this.isBackspace(keyCode)) {
        this.setState({ addZero: false })
      }
    }

    if (
      this.isForbiddenLetter(keyCode) ||
      this.isForbiddenCharacter(keyCode) ||
      (!keysArray.find(this.isCtrlMeta) && this.isAllowedLetter(keyCode)) ||
      (keysArray.find(this.isShiftAlt) && this.isDigit(keyCode))
    ) {
      event.preventDefault()
    }
  }

  render() {
    const { receiveRef, sectionName, isCheckoutOverhaulEnabled } = this.props
    let inputPrefix
    if (isCheckoutOverhaulEnabled) {
      inputPrefix = <span className={css.phonePrefixRedesign}>+44(0)</span>
    } else {
      const { addZero } = this.state
      inputPrefix = (
        <div className={css.phonePrefix}>
          <span className={css.prefix} />
          <span className={addZero ? css.withZero : css.withoutZero} />
        </div>
      )
    }

    return (
      <div
        className={classNames(css.deliveryFieldWrapper, {
          [css.deliveryFieldWrapperRedesign]: isCheckoutOverhaulEnabled,
        })}
      >
        <div className={classNames(css.row, { [css.rowRedesign]: isCheckoutOverhaulEnabled })}>
          <div
            className={classNames(css.colMDhalf, {
              [redesignCss.inputContainer]: isCheckoutOverhaulEnabled,
            })}
          >
            <Field
              name="phone"
              component={ReduxFormInput}
              inputPrefix={inputPrefix}
              inputType="Input"
              type="tel"
              required
              onKeyDown={this.handleKeyDown}
              color="gray"
              subLabel={
                isCheckoutOverhaulEnabled
                  ? 'Used to update you on your delivery'
                  : 'For account queries'
              }
              label="Phone number"
              mask
              withRef
              ref={receiveRef}
              refId={`${sectionName}.phone`}
              data-testing="checkoutPhoneNumberInput"
              isCheckoutOverhaulEnabled={isCheckoutOverhaulEnabled}
            />
          </div>
        </div>
      </div>
    )
  }
}

DeliveryPhoneNumber.propTypes = {
  receiveRef: PropTypes.func,
  sectionName: PropTypes.string,
  isCheckoutOverhaulEnabled: PropTypes.bool,
}

DeliveryPhoneNumber.defaultProps = {
  receiveRef: () => {},
  sectionName: 'delivery',
  isCheckoutOverhaulEnabled: false,
}

export { DeliveryPhoneNumber }
