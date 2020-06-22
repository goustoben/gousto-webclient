import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Button, Control, Segment, Tooltip } from 'goustouicomponents'
import config from 'config/recipes'
import Surcharge from './Surcharge'
import css from './Buttons.css'

class Buttons extends React.Component {
  constructor() {
    super()

    this.state = {
      tooltipVisible: false,
    }
  }

  getSurchargeGridClass = (className, ...otherClasses) => {
    const { view, surchargePerPortion } = this.props
    const viewsToExclude = config.recipeDetailViews

    const shouldApplyClass = Boolean(
      surchargePerPortion
      && !viewsToExclude.includes(view)
    )
    const otherClassNames = otherClasses.map(name => css[name])

    return classnames(
      { [css[className]]: shouldApplyClass },
      ...otherClassNames
    )
  }

  getSegments = (tooltipMessage, tooltipWidth, disabled) => {
    const { numPortions, qty, surchargePerPortion, buttonText } = this.props
    const { tooltipVisible } = this.state
    const segmentSelectedClass = this.getSurchargeGridClass('segmentSelected', 'sentenceCaseSegment')

    if (qty > 0) {
      const totalQty = qty * numPortions
      const defaultContent = ' Servings Added'
      const textContent = surchargePerPortion ? ' Added' : defaultContent

      return [
        <Segment
          key={0}
          onClick={this.handleRemove}
          size="small"
          className={segmentSelectedClass}
        >
          <Control placement="left">-</Control>
        </Segment>,
        <Segment
          fill={false}
          key={1}
          size="large"
          className={segmentSelectedClass}
        >
          {`${totalQty}${textContent}`}
          {surchargePerPortion && (
            <div
              className={
                this.getSurchargeGridClass('surchargeHidden', 'surcharge')
              }
            >
              <Surcharge surcharge={surchargePerPortion} />
            </div>
          )}
        </Segment>,
        <Tooltip
          key={2}
          placement="topRight"
          message={tooltipMessage}
          visible={tooltipVisible}
          onVisibleChange={this.tooltipToggle}
          style="button"
          className={tooltipWidth}
          data-testing="menuAddServings"
        >
          <Segment
            onClick={this.handleAdd}
            hover={this.tooltipHover}
            disabledClick={this.disabledClick}
            size="small"
            disabled={disabled}
            className={segmentSelectedClass}
          >
            <Control>+</Control>
          </Segment>
        </Tooltip>,
      ]
    }

    return (
      <Tooltip
        message={tooltipMessage}
        visible={tooltipVisible}
        onVisibleChange={this.tooltipToggle}
        className={tooltipWidth}
        style="button"
      >
        <Segment
          onClick={this.handleAdd}
          hover={this.tooltipHover}
          disabledClick={this.disabledClick}
          disabled={disabled}
          fill
          className={this.getSurchargeGridClass('segment', 'sentenceCaseSegment')}
        >
          {buttonText}
          {surchargePerPortion && (
            <div
              className={
                this.getSurchargeGridClass('surchargeWrapped', 'surcharge')
              }
            >
              <Surcharge surcharge={surchargePerPortion} />
            </div>
          )}
        </Segment>
      </Tooltip>
    )
  }

  handleAdd = () => {
    const {
      disable,
      stock,
      onAdd,
      recipeId,
      view,
      position,
      score,
      menuRecipeDetailVisibilityChange,
      menuBrowseCTAVisibilityChange,
      basketPostcode
    } = this.props
    if (!disable) {
      if (stock !== null && Boolean(basketPostcode)) {
        onAdd(recipeId, view, { position, score })
      } else if (config.recipeDetailViews.includes(view)) {
        menuRecipeDetailVisibilityChange()
        setTimeout(() => { menuBrowseCTAVisibilityChange(true) }, 500)
      } else {
        menuBrowseCTAVisibilityChange(true)
      }
    }
  }

  handleRemove = () => {
    const { onRemove, recipeId, view, position, score } = this.props
    onRemove(recipeId, view, position, score)
  }

  tooltipToggle = (visible) => {
    const { isOutOfStock, limitReached } = this.props
    if (isOutOfStock || limitReached) {
      this.setState({ tooltipVisible: visible })
    }
  }

  tooltipHover = (event) => {
    const { isOutOfStock, limitReached } = this.props
    if (isOutOfStock || limitReached) {
      if (event.type === 'mouseenter') {
        this.setState({ tooltipVisible: true })
      } else if (event.type === 'mouseleave') {
        this.setState({ tooltipVisible: false })
      }
    }
  }

  disabledClick = () => {
    const { isOutOfStock, limitReached } = this.props
    const { visible } = this.state
    if (isOutOfStock || limitReached) {
      if (visible) {
        this.setState({ tooltipVisible: false })
      } else {
        this.setState({ tooltipVisible: true })
      }
    }
  }

  render() {
    const { isOutOfStock, limitReached, qty } = this.props
    const disabled = isOutOfStock || limitReached
    const dataTesting = qty < 1 ? 'menuRecipeAdd' : 'menuAddServings'
    let tooltipMessage = ''
    if (isOutOfStock) {
      tooltipMessage = 'You got the last one'
    } else if (limitReached) {
      tooltipMessage = 'You\'ve run out of space in your box!'
    }

    return (
      <Button
        fill={false}
        className={css.btnWrapper}
        data-testing={
          disabled ? 'menuRecipeAddDisabled' : dataTesting
        }
        width="full"
      >
        {this.getSegments(
          tooltipMessage,
          css.tooltipMobileGrid,
          disabled
        )}
      </Button>
    )
  }
}

Buttons.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  limitReached: PropTypes.bool.isRequired,
  recipeId: PropTypes.string.isRequired,
  position: PropTypes.number,
  qty: PropTypes.number.isRequired,
  numPortions: PropTypes.number.isRequired,
  view: PropTypes.string,
  isOutOfStock: PropTypes.bool,
  disable: PropTypes.bool.isRequired,
  stock: PropTypes.number,
  menuBrowseCTAVisibilityChange: PropTypes.func,
  menuRecipeDetailVisibilityChange: PropTypes.func.isRequired,
  surchargePerPortion: PropTypes.number,
  score: PropTypes.number,
  buttonText: PropTypes.string,
  basketPostcode: PropTypes.string
}

Buttons.defaultProps = {
  buttonText: 'Add Recipe',
  basketPostcode: '',
  isOutOfStock: false
}

export default Buttons
