import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Icon from 'Icon'
import { Spotlight } from 'Spotlight'
import { Tooltip } from 'Tutorial/Tooltip'

import { isElementHidden, getSpotlightLocation, getTooltipProperties } from 'Tutorial/helpers'
import css from './Step.css'

export class Step extends PureComponent {
  state = {
    x: 0,
    y: 0,
    style: {},
    arrow: '',
  }

  componentDidMount() {
    window.addEventListener('resize', this.recalculateLocations)
    this.recalculateLocations()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.recalculateLocations)
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevState) !== JSON.stringify(this.state)) {
      this.recalculateLocations()
    }
  }

  recalculateLocations = () => {
    const { selector, next } = this.props
    const stepWidth = (window.innerWidth < 456) ? 200 : (window.innerWidth < 756 ? 250 : 300)
    if (isElementHidden(selector)) {
      next()

      return
    }

    const { x, y } = getSpotlightLocation(selector)
    const { style, arrow } = getTooltipProperties(selector, stepWidth)

    this.setState({
      x,
      y,
      style,
      arrow,
    })
  }

  render() {
    const { x, y, style, arrow } = this.state
    const { children, last, onClose, next } = this.props

    return (
      <div>
        <Spotlight
          x={x}
          y={y}
          onClick={onClose}
        />
        <div className={css.tooltip} style={style}>
          <Tooltip arrow={arrow} onClose={onClose}>
            {children}
            <div className={css.cta} onClick={next} data-testing="tutorialStepCta">
              {(last) ? (
                <p>OK</p>
              ) : (
                <p>
                  NEXT
                  {' '}
                  <Icon name="fa-angle-right" size={30} className={css.cta__icon} />
                </p>
              )}
            </div>
          </Tooltip>
        </div>
      </div>
    )
  }
}

Step.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  last: PropTypes.bool,
  next: PropTypes.func,
  onClose: PropTypes.func,
  selector: PropTypes.string.isRequired,
}

Step.defaultProps = {
  children: null,
  last: false,
  next: null,
  onClose: null,
}
