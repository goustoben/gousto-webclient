import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getScrollOffset } from 'utils/menu'

import css from './FoodBrandPage.css'

const propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  borderColor: PropTypes.string,
  browser: PropTypes.string,
  removeFoodBrand: PropTypes.func,
}
class FoodBrandPage extends PureComponent {
  
  constructor(props) {
    super(props)
    this.state = {
      scrolledPastPoint: false,
      scrolledPastPointBorder: false
    }
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
      const threshold = (browser === 'mobile') ? 53 : 90
      const { scrolledPastPoint } = this.state
      const scrollState = getScrollOffset(threshold, 0, scrolledPastPoint)

      scrollState && this.setState({
        scrolledPastPoint: scrollState.scrolledPastPoint,
      })

      this.setState({
        scrolledPastPointBorder: (window.pageYOffset >= 102)
      })
    }
  }
  
  render() {
    const { name, description, borderColor, removeFoodBrand } = this.props
    const { scrolledPastPoint, scrolledPastPointBorder } = this.state

    const classNameTitle = scrolledPastPoint ? css.foodBrandTitleContainerFixed : css.foodBrandTitleContainer

    return (
      <section className={css.foodBrandContainer}>
        <div style={{borderBottom: `6px solid ${borderColor}`}}>
          <div className={classNameTitle} style={scrolledPastPointBorder ? {borderBottom: `6px solid ${borderColor}`} : {}}>
            <span className={css.backButton} role="button" tabIndex={0} onClick={removeFoodBrand} onKeyPress={removeFoodBrand}>
              <span className={css.leftArrow}/>Back <span className={css.hideOnMobile}>to All Recipes</span>
            </span>
            <h1>{name}</h1>
          </div>
          <p className={css.foodBrandDescription}>{description}</p>
        </div>
        <div className={css.foodBrandRecipes}>Recipes here</div>
      </section>
    )
  }
}
FoodBrandPage.propTypes = propTypes

export { FoodBrandPage }
