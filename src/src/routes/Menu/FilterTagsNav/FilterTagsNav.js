import PropTypes from 'prop-types'
import React from 'react'
import { getScrollOffset } from 'utils/menu'
import FilterTagsList from './FilterTagsList'
import css from './FilterTagsNav.css'

const propTypes = {
  menuFilterExperiment: PropTypes.bool,
  browser: PropTypes.string,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      type: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
}

class FilterTagsNav extends React.PureComponent {
  state = {
    scrolledPastPoint: false 
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
      const threshold = (browser === 'mobile') ? 253 : 350
      const animationThreshold = 50
      const { scrolledPastPoint } = this.state
      
      const scrollState = getScrollOffset(threshold, animationThreshold, scrolledPastPoint)
      scrollState && this.setState({
        scrolledPastPoint: scrollState.scrolledPastPoint,
      })
    }
  }
  
  getClassNameFilterNav = () => {
    const { tags } = this.props
    const { scrolledPastPoint } = this.state
    const isAnySelected = tags.find(tag => tag.selected === true)

    return (isAnySelected && scrolledPastPoint) ? css.filterListContainerFixed : css.filterListContainer
  }

  getClassNameFilterTag = () => {
    const { tags } = this.props
    const { scrolledPastPoint } = this.state
    const isAnySelected = tags.find(tag => tag.selected === true)

    if (!scrolledPastPoint) {
      return css.filterTagContainer
    }

    if (isAnySelected) {
      return css.filterTagContainerFixedWithFilters
    }

    return css.filterTagContainerFixedWithoutFilters
  }

  render() {
    const { tags, menuFilterExperiment } = this.props
    const className = this.getClassNameFilterNav()
    const classNamefilterTagContainer = this.getClassNameFilterTag()

    return (
      (menuFilterExperiment) ? (
        <div className={classNamefilterTagContainer}>
          <div className={className}>
            <FilterTagsList tags={tags} />
          </div>
        </div>
      ) : null
    )
  }
}

FilterTagsNav.propTypes = propTypes

FilterTagsNav.defaultProps = {
  tags: [],
  menuFilterExperiment: false,
  onCTAClick: () => { },
}

export default FilterTagsNav
