import PropTypes from 'prop-types'
import React from 'react'
import { getScrollOffset } from 'utils/menu'
import FilterTagsList from './FilterTagsList'
import css from './FilterTagsNav.css'

const propTypes = {
  menuFilterExperiment: PropTypes.bool,
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
    if (this.hasScrolled) {
      this.hasScrolled = false
      const threshold = 250
      const animationThreshold = 50
      const { scrolledPastPoint } = this.state
      
      const scrollState = getScrollOffset(threshold, animationThreshold, scrolledPastPoint)
      scrollState && this.setState({
        scrolledPastPoint: scrollState.scrolledPastPoint,
        scrollJumped: scrollState.scrollJumped
      })
    }
  }

  render() {
    const { tags, menuFilterExperiment } = this.props
    const className = this.state.scrolledPastPoint ? css.filterTagContainerFixed : css.filterTagContainer

    return (
      (menuFilterExperiment) ? (
        <div className={className}>
          <div className={css.filterListContainer}>
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
