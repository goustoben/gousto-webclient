import PropTypes from 'prop-types'
import React from 'react'
import { Button, Segment, Control, Tooltip } from 'goustouicomponents'
import { checkoutConfig } from 'config/checkout'
import css from './Buttons.module.css'

class Buttons extends React.Component {
  constructor() {
    super()

    this.state = {
      tooltipVisibleAdd: false,
      tooltipVisibleRemove: false,
    }
  }

  getSegments = (tooltipMessage, tooltipWidth, canAdd, canRemove, segment) => {
    const { tooltipVisibleRemove, tooltipVisibleAdd } = this.state

    return [
      <Tooltip
        key={0}
        placement="topRight"
        message="Return to the menu to select new recipes"
        visible={tooltipVisibleRemove}
        onVisibleChange={this.tooltipToggle(canRemove, 'Remove')}
        /* eslint-disable-next-line react/style-prop-object */
        style="button"
        className={tooltipWidth}
      >
        <Segment
          onClick={this.handleRemove}
          disabledClick={this.disabledClick(canRemove, 'Remove')}
          hover={this.tooltipHover(canRemove, 'Remove')}
          disabled={canRemove}
          size="shortSmall"
          className={css.segmentSmall}
          fill={false}
        >
          <Control placement="left">-</Control>
        </Segment>
      </Tooltip>,
      segment,
      <Tooltip
        key={2}
        placement="topRight"
        message={tooltipMessage}
        visible={tooltipVisibleAdd}
        onVisibleChange={this.tooltipToggle(canAdd, 'Add')}
        /* eslint-disable-next-line react/style-prop-object */
        style="button"
        className={tooltipWidth}
      >
        <Segment
          onClick={this.handleAdd}
          hover={this.tooltipHover(canAdd, 'Add')}
          disabledClick={this.disabledClick(canAdd, 'Add')}
          size="shortSmall"
          className={css.segmentSmall}
          disabled={canAdd}
          fill={false}
        >
          <Control>+</Control>
        </Segment>
      </Tooltip>,
    ]
  }

  handleAdd = () => {
    const { stock, onAdd, recipeId, view } = this.props
    if (stock !== null) {
      onAdd(recipeId, view)
    }
  }

  handleRemove = () => {
    const { qty, view, recipeId, onRemove } = this.props
    if (qty > 1) {
      onRemove(recipeId, view)
    }
  }

  tooltipToggle = (condition, stateName) => (visible) => {
    if (condition) {
      this.setState({ [`tooltipVisible${stateName}`]: visible })
    }
  }

  tooltipHover = (condition, stateName) => (event) => {
    if (condition) {
      if (event.type === 'mouseenter') {
        this.setState({ [`tooltipVisible${stateName}`]: true })
      } else if (event.type === 'mouseleave') {
        this.setState({ [`tooltipVisible${stateName}`]: false })
      }
    }
  }

  disabledClick = (condition, stateName) => () => {
    if (condition) {
      const { visible } = this.state
      if (visible) {
        this.setState({ [`tooltipVisible${stateName}`]: false })
      } else {
        this.setState({ [`tooltipVisible${stateName}`]: true })
      }
    }
  }

  render() {
    const { outOfstock, limitReached, showControl, qty, numPortions } = this.props
    let tooltipMessage = ''
    if (outOfstock) {
      tooltipMessage = checkoutConfig.tooltip.outOfstock
    } else if (limitReached) {
      tooltipMessage = checkoutConfig.tooltip.limitReached
    }
    const segment = (
      <Segment
        key={1}
        size="shortLarge"
        fill={false}
        disabled
        className={showControl ? css.parsley : css.noControl}
      >
        {`${qty * numPortions} Servings`}
      </Segment>
    )

    return (
      <Button className={css.btnCheckout} width="auto">
        {showControl
          ? this.getSegments(
              tooltipMessage,
              css.tooltipWidth,
              outOfstock || limitReached,
              qty === 1,
              segment
            )
          : segment}
      </Button>
    )
  }
}

Buttons.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  limitReached: PropTypes.bool.isRequired,
  recipeId: PropTypes.string.isRequired,
  qty: PropTypes.number.isRequired,
  numPortions: PropTypes.number.isRequired,
  view: PropTypes.string,
  outOfstock: PropTypes.bool,
  disabled: PropTypes.bool.isRequired, // eslint-disable-line react/no-unused-prop-types
  stock: PropTypes.number,
  showControl: PropTypes.bool,
}

Buttons.defaultProps = {
  view: '',
  outOfstock: false,
  stock: 0,
  showControl: false,
}

export { Buttons }
