import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import { Button, Control, Segment, Tooltip } from 'goustouicomponents'
import { AgeVerificationCheckBox } from 'Product/AgeVerification'
import css from './Buttons.css'

class Buttons extends React.PureComponent {
  static propTypes = {
    ageVerificationPending: PropTypes.bool,
    fullWidth: PropTypes.bool,
    isAgeVerificationRequired: PropTypes.bool,
    isAvailable: PropTypes.bool,
    inProgress: PropTypes.bool,
    limitReached: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool,
    ]).isRequired,
    onAdd: PropTypes.func,
    onRemove: PropTypes.func,
    onVerifyAge: PropTypes.func,
    outOfStock: PropTypes.bool,
    productId: PropTypes.string.isRequired,
    qty: PropTypes.number,
    showPopUp: PropTypes.bool,
  }

  static defaultProps = {
    ageVerificationPending: false,
    fullWidth: false,
    isAgeVerificationRequired: false,
    isAvailable: true,
    inProgress: false,
    limitReached: false,
    onAdd: () => { },
    onRemove: () => { },
    onVerifyAge: () => { },
    outOfStock: false,
    qty: 0,
    showPopUp: false,
  }

  state = {
    ageVerifyShowError: false,
    ageVerifyTooltipVisible: false,
    tooltipVisible: false,
  }

  ageVerifyTooltipToggle = (visible) => {
    this.setState({ ageVerifyTooltipVisible: visible })
  }

  getTooltipMessage = () => {
    if (this.props.outOfStock) {
      return 'Sorry, we don\'t have anymore in stock'
    }

    if (this.props.limitReached) {
      return this.getLimitReachedMessage()
    }

    return ''
  }

  getLimitReachedMessage = () => {
    let message = ''

    if (this.props.limitReached) {
      switch (this.props.limitReached.type) {
      case 'box':
        message = 'Sorry, we can\'t fit anymore items in your box'
        break
      case 'item':
        message = 'Sorry, we can\'t fit anymore of this item in your box'
        break
      case 'category':
        message = `Sorry, we can't fit anymore "${this.props.limitReached.value}" items in your box`
        break
      default:
        return message
      }
    }

    return message
  }

  handleAdd = () => {
    const { isAgeVerificationRequired, showPopUp, isAvailable, onAdd, productId } = this.props
    if (isAgeVerificationRequired && !showPopUp) {
      this.setState({ ageVerifyTooltipVisible: true })
    } else if (isAvailable) {
      onAdd(productId)
    }
  }

  handleAgeVerify = (verified) => {
    this.setState({ ageVerifyTooltipVisible: !verified }, async () => {
      try {
        await this.props.onVerifyAge(verified, true)
      } catch (err) {
        this.setState({ ageVerifyShowError: true }, () => {
          setTimeout(() => { this.setState({ ageVerifyShowError: false }) }, 5000)
        })
      }
    })
  }

  handleRemove = () => {
    this.props.onRemove(this.props.productId)
  }

  tooltipToggle = (visible) => {
    if (!this.props.isAvailable) {
      this.setState({ tooltipVisible: visible })
    }
  }

  tooltipHover = (event) => {
    if (!this.props.isAvailable) {
      if (event.type === 'mouseenter') {
        this.setState({ tooltipVisible: true })
      } else if (event.type === 'mouseleave') {
        this.setState({ tooltipVisible: false })
      }
    }
  }

  disabledClick = () => {
    if (!this.props.isAvailable) {
      if (this.state.visible) {
        this.setState({ tooltipVisible: false })
      } else {
        this.setState({ tooltipVisible: true })
      }
    }
  }

  renderAgeVerificationComponent = () => {
    const { isAgeVerificationRequired, isAvailable, inProgress, showPopUp } = this.props
    const { ageVerifyShowError, ageVerifyTooltipVisible } = this.state

    return (isAgeVerificationRequired && !showPopUp) &&
      (<AgeVerificationCheckBox
        disabled={inProgress || !isAvailable}
        onCheckBoxChange={this.handleAgeVerify}
        onTooltipToggle={this.ageVerifyTooltipToggle}
        showError={ageVerifyShowError}
        tooltipVisible={ageVerifyTooltipVisible}
      />)
  }

  render() {
    const { qty, isAvailable, inProgress, ageVerificationPending, fullWidth, outOfStock } = this.props
    const { tooltipVisible } = this.state
    const tooltipMessage = !isAvailable ? this.getTooltipMessage() : ''
    const cssSegmentController = classnames({ [css['segmentControler']]: !fullWidth })
    const cssQtySegment = classnames({ [css['qtySegment']]: !fullWidth })
    const cssAddButton = classnames({ [css['addButton']]: !fullWidth })
    const cssBtnWrapper = classnames(
      css.btnWrapper, {
        [css['btnWrapper--fullWidth']]: (fullWidth || outOfStock),
      }
    )
    let segments

    if (qty > 0) {
      segments = [
        <Segment
          key={0}
          onClick={this.handleRemove}
          className={cssSegmentController}
        >
          <Control placement="left" >-</Control>
        </Segment>,
        <Segment
          fill={false}
          key={1}
          className={cssQtySegment}
        >
          {qty}
        </Segment>,
        <Tooltip
          key={2}
          placement="topRight"
          style="button"
          message={tooltipMessage}
          visible={tooltipVisible}
          onVisibleChange={this.tooltipToggle}
        >
          <Segment
            onClick={this.handleAdd}
            hover={this.tooltipHover}
            disabledClick={this.disabledClick}
            disabled={!isAvailable}
            className={cssSegmentController}
          >
            <Control placement="right">+</Control>
          </Segment>
        </Tooltip>,
      ]
    } else {
      segments = [
        <Tooltip
          key={0}
          message={tooltipMessage}
          visible={tooltipVisible}
          onVisibleChange={this.tooltipToggle}
          style="button"
        >
          <Segment
            onClick={this.handleAdd}
            hover={this.tooltipHover}
            disabledClick={this.disabledClick}
            disabled={!isAvailable}
            fill={false}
            width={'auto'}
            className={cssAddButton}
          >
            {outOfStock ? 'Sold out' : 'Add'}
          </Segment>
        </Tooltip>,
      ]
    }

    const isButtonDisabled = () => {
      if (!inProgress && ageVerificationPending) {
        return true
      }
      if (outOfStock) {
        return true
      }

      return false
    }

    return (
      <div className={css.buttonsContainer}>
        {this.renderAgeVerificationComponent()}
        <Button
          fill={false}
          width="full"
          className={cssBtnWrapper}
          pending={inProgress}
          disabled={isButtonDisabled()}
        >
          {segments}
        </Button>
      </div>
    )
  }
}

export default Buttons
