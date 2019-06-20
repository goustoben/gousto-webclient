import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getScrollOffset } from 'utils/menu'

import css from './FoodBrandPage.css'

const propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  borderColor: PropTypes.string,
  browser: PropTypes.string,
}
class FoodBrandPage extends PureComponent {
  getFoodBrangeColor = (borderColor) => ({
    borderBottom: `2px solid ${borderColor}`,
  })

  constructor(props) {
    super(props)
    this.state = { scrolledPastPoint: false }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll)

    this.checkScroll()

    this.intervals = setInterval(() => {
      this.checkScroll()
    }, 50)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)

    if (this.intervals) {
      clearInterval(this.intervals)
      this.intervals = null
    }
  }

  onScroll = () => {
    this.hasScrolled = true
  }

  checkScroll = () => {
    const { browser } = this.props
    if (this.hasScrolled) {
      this.hasScrolled = false
      const threshold = (browser === 'mobile') ? 53 : 89
      const animationThreshold = 50
      const { scrolledPastPoint } = this.state
      const scrollState = getScrollOffset(threshold, animationThreshold, scrolledPastPoint)
      scrollState && this.setState({
        scrolledPastPoint: scrollState.scrolledPastPoint,
      })
    }
  }
  
  render() {
    const { title, description, borderColor } = this.props

    const classNameContainer = this.state.scrolledPastPoint ? css.foodBrandContainerFixed : css.foodBrandContainer
    const classNameTitle = this.state.scrolledPastPoint ? css.foodBrandTitleContainerFixed : css.foodBrandTitleContainer

    return (
      <section className={classNameContainer}>
        <div style={this.getFoodBrangeColor(borderColor)}>
          <div className={classNameTitle}>
            <span><span className={css.leftArrow}/>Back</span>
            <h1>{title}</h1>
          </div>
          <p className={css.foodBrandDescription}>{description}</p>
        </div>
      </section>
    )
  }
}
FoodBrandPage.propTypes = propTypes

export { FoodBrandPage }
