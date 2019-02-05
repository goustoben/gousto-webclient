import React, { PureComponent } from 'react'

import css from './Spotlight.css'
import { getEllipse } from './ellipse'

export class Spotlight extends PureComponent {
  state = {
    x: 0,
    y: 0,
    RADIUS: 200,
    accuracy: 0.3,
  }

  node = null

  componentDidMount() {
    document.addEventListener('mousemove', this.handleClick)
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleClick)
  }

  handleClick = (e) => {
    this.setState({
      x: e.clientX,
      y: e.clientY,
    })
  }

  render() {
    const { x, y, RADIUS, accuracy } = this.state
    const steps = getEllipse({
      originX: x,
      originY: y,
      radius: RADIUS,
      accuracy,
    })

    return (
      <div
        className={css.spotlight}
        style={{
          clipPath: `polygon(
            0% 0%,
            100% 0%,
            100% ${y}px,
            ${steps}
            100% ${y}px,
            100% 100%,
            0% 100%
          )`,
        }}
      >
      </div>
    )
  }
}
