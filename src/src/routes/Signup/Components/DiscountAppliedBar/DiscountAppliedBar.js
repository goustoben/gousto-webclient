import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { onEnter } from 'utils/accessibility'
import { signupConfig } from 'config/signup'
import css from './DiscountAppliedBar.css'

class DiscountAppliedBar extends Component {
  constructor(props) {
    super(props)
    const { promoModalVisible, isPromoBarHidden } = props
    this.state = {
      isHidden: promoModalVisible || !(!promoModalVisible && isPromoBarHidden),
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { isPromoBarHidden, promoModalVisible, trackDiscountVisibility, wizardStep } = this.props
    const { isHidden } = this.state

    if (prevProps.promoModalVisible !== promoModalVisible) {
      this.setState({
        isHidden: promoModalVisible && isPromoBarHidden
      })
    }

    if (prevState.isHidden && prevState.isHidden !== isHidden) {
      trackDiscountVisibility(wizardStep)
    }
  }

  onClose = () => {
    this.setState({
      isHidden: true
    })
  }

  render() {
    const { isHidden } = this.state

    return (
      <div className={classNames(css.container, { [css.isHidden]: isHidden })}>
        <div className={css.successIcon} />
        <span className={css.discountText}>
          <span className={css.discountApplied}>
            {signupConfig.boxSizeStep.discountApplied}
            !
          </span>
          {' '}
          {signupConfig.discountAppliedText}
        </span>
        <div
          className={css.closeIcon}
          role="button"
          tabIndex="0"
          onClick={this.onClose}
          onKeyDown={onEnter(this.onClose)}
        />
      </div>
    )
  }
}

DiscountAppliedBar.propTypes = {
  promoModalVisible: PropTypes.bool.isRequired,
  isPromoBarHidden: PropTypes.bool.isRequired,
  trackDiscountVisibility: PropTypes.func.isRequired,
  wizardStep: PropTypes.string.isRequired,
}

export {
  DiscountAppliedBar,
}
