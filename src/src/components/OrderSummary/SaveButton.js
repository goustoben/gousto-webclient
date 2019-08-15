import PropTypes from 'prop-types'
import React from 'react'
import { Button } from 'goustouicomponents'
import classnames from 'classnames'
import css from './OrderSummary.css'

class SaveButton extends React.PureComponent {

  static propTypes = {
    error: PropTypes.bool,
    onClick: PropTypes.func,
    onOrderConfirmationMobile: PropTypes.bool,
    saving: PropTypes.bool,
    saveRequired: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    error: false,
    onClick: () => { },
    onOrderConfirmationMobile: false,
    saving: false,
    saveRequired: false,
  }

  state = {
    showButton: this.props.saveRequired,
    showError: false,
    showSuccess: false,
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.saveRequired && nextProps.saveRequired) {
      this.setState({ showButton: true })
    }

    if (this.props.saving && !nextProps.saving) {
      if (!nextProps.error) {
        this.setState({ showSuccess: true, showButton: false }, () => {
          setTimeout(() => { this.setState({ showSuccess: false }) }, 5000)
        })
      } else {
        this.setState({ showError: true }, () => {
          setTimeout(() => { this.setState({ showError: false }) }, 5000)
        })
      }
    }
  }

  render = () => (
    <div className={classnames({ [css.updateOrderButton]: this.props.onOrderConfirmationMobile })}>
      {!!this.state.showButton &&
        <div className={css.button}>
          <Button
            disabled={this.props.saving}
            onClick={this.props.onClick}
            pending={this.props.saving}
            width="full"
          >
            Update Order
          </Button>
        </div>
      }
      {(this.state.showSuccess && !this.state.showButton)? <div className={css.success}>SAVED</div> : ''}
      {(this.state.showError && !this.state.showButton) ? <div className={css.error}>ERROR SAVING CHOICES</div> : ''}
    </div>
  )
}

export default SaveButton
