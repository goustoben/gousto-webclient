import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { onEnter } from 'utils/accessibility'
import { signupConfig } from 'config/signup'
import css from './DiscountAppliedBar.css'

class DiscountAppliedBar extends Component {
  constructor(props) {
    super(props)
    const { promoModalVisible, isPromoBarHidden, isDiscountAppliedBarDismissed } = props
    this.state = {
      isHidden: isDiscountAppliedBarDismissed || promoModalVisible || isPromoBarHidden,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { isPromoBarHidden, trackDiscountVisibility, wizardStep } = this.props
    const { isHidden } = this.state

    if (prevProps.isPromoBarHidden !== isPromoBarHidden) {
      this.setState({
        isHidden: isPromoBarHidden,
      })
    }

    if (prevState.isHidden && prevState.isHidden !== isHidden) {
      trackDiscountVisibility(wizardStep)
    }
  }

  onClose = () => {
    const { signupDismissDiscountAppliedBar } = this.props
    signupDismissDiscountAppliedBar()

    this.setState({
      isHidden: true,
    })
  }

  render() {
    const { isHidden } = this.state

    return (
      <div
        className={classNames(css.container, {
          [css.isHidden]: isHidden,
        })}
      >
        <div className={css.successIcon} />
        <span className={css.discountText}>
          <span className={css.discountApplied}>{signupConfig.boxSizeStep.discountApplied}!</span>{' '}
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
  isDiscountAppliedBarDismissed: PropTypes.bool,
  signupDismissDiscountAppliedBar: PropTypes.func,
}

DiscountAppliedBar.defaultProps = {
  isDiscountAppliedBarDismissed: false,
  signupDismissDiscountAppliedBar: () => {},
}

export { DiscountAppliedBar }
