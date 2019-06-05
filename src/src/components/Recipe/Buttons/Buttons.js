import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Button, Control, Segment, Tooltip } from 'goustouicomponents'
import config from 'config/recipes'
import Surcharge from './Surcharge'
import css from './Buttons.css'

class Buttons extends React.Component {

  static propTypes = {
    onAdd: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    limitReached: PropTypes.bool.isRequired,
    recipeId: PropTypes.string.isRequired,
    position: PropTypes.number,
    qty: PropTypes.number.isRequired,
    numPortions: PropTypes.number.isRequired,
    view: PropTypes.string,
    outOfstock: PropTypes.bool,
    disable: PropTypes.bool.isRequired,
    stock: PropTypes.number,
    menuBrowseCTAVisibilityChange: PropTypes.func,
    menuRecipeDetailVisibilityChange: PropTypes.func,
    surchargePerPortion: PropTypes.number,
    score: PropTypes.number,
  }

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
      surchargePerPortion &&
      !viewsToExclude.includes(view)
    )
    const otherClassNames = otherClasses.map(name => css[name])

    return classnames(
      { [css[className]]: shouldApplyClass },
      ...otherClassNames
    )
  }

  getSegments = (tooltipMessage, tooltipWidth, disabled) => {
    const { numPortions, qty, surchargePerPortion, view } = this.props
    const { tooltipVisible } = this.state
    const segmentSelectedClass = this.getSurchargeGridClass('segmentSelected')

    if (qty > 0) {
      const totalQty = qty * numPortions
      const defaultContent = view !== 'gridSmall' ? ' Servings Added' : ''
      const textContent = surchargePerPortion ? ' Added' : defaultContent

      return [
        <Segment
          key={0}
          onClick={this.handleRemove}
          size="small"
          className={segmentSelectedClass}
        >
          <Control placement="left" >-</Control>
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
          visible={this.state.tooltipVisible}
          onVisibleChange={this.tooltipToggle}
          style="button"
          className={tooltipWidth}
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
        visible={this.state.tooltipVisible}
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
          className={this.getSurchargeGridClass('segment')}
        >
          Add {view !== 'gridSmall' ? 'Recipe' : ''}
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
    if (!this.props.disable) {
      if (this.props.stock !== null) {
        this.props.onAdd(this.props.recipeId, this.props.view, false, { position: this.props.position, score: this.props.score })
      } else if (config.recipeDetailViews.includes(this.props.view)) {
        this.props.menuRecipeDetailVisibilityChange(false)
        setTimeout(() => { this.props.menuBrowseCTAVisibilityChange(true) }, 500)
      } else {
        this.props.menuBrowseCTAVisibilityChange(true)
      }
    }
  }

  handleRemove = () => {
    this.props.onRemove(this.props.recipeId, this.props.view, this.props.position, this.props.score)
  }

  tooltipToggle = (visible) => {
    if (this.props.outOfstock || this.props.limitReached) {
      this.setState({ tooltipVisible: visible })
    }
  }

  tooltipHover = (event) => {
    if (this.props.outOfstock || this.props.limitReached) {
      if (event.type === 'mouseenter') {
        this.setState({ tooltipVisible: true })
      } else if (event.type === 'mouseleave') {
        this.setState({ tooltipVisible: false })
      }
    }
  }

  disabledClick = () => {
    if (this.props.outOfstock || this.props.limitReached) {
      if (this.state.visible) {
        this.setState({ tooltipVisible: false })
      } else {
        this.setState({ tooltipVisible: true })
      }
    }
  }

  render() {
    const disabled = this.props.outOfstock || this.props.limitReached
    let tooltipMessage = ''
    if (this.props.outOfstock) {
      tooltipMessage = 'You got the last one'
    } else if (this.props.limitReached) {
      tooltipMessage = 'You\'ve run out of space in your box!'
    }

    return (
      <Button
        fill={false}
        className={css.btnWrapper}
        data-testing="menuRecipeAdd"
        width="full"
      >
        {this.getSegments(
          tooltipMessage,
          (this.props.view === 'gridSmall') ? css.tooltipMobileGrid : css.tooltipWidth,
          disabled
        )}
      </Button>
    )
  }
}

export default Buttons
