import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Tooltip } from 'Tooltip'
import { Spotlight } from 'Spotlight'

import { getSpotlightLocation, getTooltipProperties } from 'Tutorial/helpers'
import css from './Step.css'

export class Step extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    last: PropTypes.bool,
    onClose: PropTypes.func,
    onClick: PropTypes.func,
    selector: PropTypes.string.isRequired,
  }

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

  recalculateLocations = () => {
    const { selector } = this.props
    const { x, y } = getSpotlightLocation(selector)
    const { style, arrow } = getTooltipProperties(selector, 300)

    this.setState({
      x,
      y,
      style,
      arrow,
    })
  }

  render() {
    const { x, y, style, arrow } = this.state
    const { children, last, onClose, onClick } = this.props

    return (
      <div>
        <Spotlight
          x={x}
          y={y}
        />
        <div className={css.tooltip} style={style}>
          <Tooltip arrow={arrow} onClose={onClose}>
            {children}
            <div className={css.cta} onClick={onClick}>
              <p>{(last) ? 'OK' : 'NEXT &rsaquo'}</p>
            </div>
          </Tooltip>
        </div>
      </div>
    )
  }
}
