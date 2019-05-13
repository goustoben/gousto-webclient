import PropTypes from 'prop-types'
import React from 'react'
import { Field } from 'redux-form'
import ReduxFormInput from 'Form/ReduxFormInput'
import css from '../Delivery.css'

class DeliveryPhoneNumber extends React.PureComponent {
  static propTypes = {
    phone: PropTypes.string,
    receiveRef: PropTypes.func,
    sectionName: PropTypes.string,
  }

  static defaultProps = {
    phone: '',
    receiveRef: () => {},
  }

  constructor(props) {
    super(props)

    this.state = {
      addZero: false,
    }
  }

  /**
   * object containing pressed keys
   * @type {{}}
   */
  keys = {};

  /**
   * except for 'a', 'c', 'v', 'x', 'y', 'z'
   * @param keyCode
   */
  isForbiddenLetter = keyCode => (keyCode === 66 || (keyCode >= 68 && keyCode <= 85) || keyCode === 87)

  /**
   * 'a', 'c', 'v', 'x', 'y', 'z'
   * @param keyCode
   */
  isAllowedLetter = keyCode => (keyCode === 65 || keyCode === 67 || keyCode === 86 || (keyCode >= 88 && keyCode <= 90))

  /**
   * space, semi-colon, equal sign, comma, dash, period, forward slash, grave accent, open bracket, back slash, close bracket, single quote
   * @param keyCode
   */
  isForbiddenCharacter = keyCode => (keyCode === 32 || (keyCode >= 186 && keyCode <= 192) || (keyCode >= 219 && keyCode <= 222))

  isDigit = keyCode => ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105))

  isZero = keyCode => [48, 96].includes(keyCode)

  isBackspace = keyCode => (keyCode === 8)

  isCtrlMeta = event => (event.ctrlKey || event.metaKey)

  isShiftAlt = event => (event.shiftKey || event.altKey)

  handleKeyDown = (event) => {
    if (!event || !event.target) return
    const input = event.target
    const keyCode = event.keyCode

    if (!this.keys[keyCode]) {
      this.keys[keyCode] = event
    }

    const keysArray = Object.values(this.keys)

    /**
     * cursor at the beginning of the input
     */
    if ((!event.target.selectionStart || !input.value)) {
      if (this.isZero(keyCode)) {
        this.setState({ addZero: true })
        event.preventDefault()
      } else if (this.isBackspace(keyCode)) {
        this.setState({ addZero: false })
      }
    }

    if ((this.isForbiddenLetter(keyCode) || this.isForbiddenCharacter(keyCode))
      || (!keysArray.find(this.isCtrlMeta) && this.isAllowedLetter(keyCode))
      || (keysArray.find(this.isShiftAlt) && this.isDigit(keyCode))) {
      event.preventDefault()
    }
  }

  render() {
    const inputPrefix = (<div className={css.phonePrefix}><span className={css.prefix} />
      <span className={this.state.addZero ? css.withZero : css.withoutZero} />
                        </div>)

    return (
      <div className={css.deliveryFieldWrapper}>
        <div className={css.row}>
          <div className={css.colMDhalf}>
            <Field
              name="phone"
              component={ReduxFormInput}
              inputPrefix={inputPrefix}
              inputType="Input"
              type="tel"
              required
              onKeyDown={this.handleKeyDown}
              color="gray"
              subLabel="For account queries"
              label="Phone number"
              mask
              withRef
              ref={this.props.receiveRef}
              refId={`${this.props.sectionName}.phone`}
              data-testing="checkoutPhoneNumberInput"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default DeliveryPhoneNumber
