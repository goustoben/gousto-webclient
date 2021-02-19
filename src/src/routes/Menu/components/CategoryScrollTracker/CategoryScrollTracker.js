import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

class CategoryScrollTracker extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    const { children } = this.props

    if (!children) {
      window.addEventListener('scroll', this.handleScroll)
    }
  }

  componentWillUnmount() {
    const { children } = this.props

    if (!children) {
      window.removeEventListener('scroll', this.handleScroll)
    }
  }

  handleScroll = (event) => {
    const { state } = this
    const { children, stepSize, scrollDirection, categoryId } = this.props
    let scrollPosition = 0
    let scrollSize = 0

    if (children) {
      const { target: element } = event

      if (scrollDirection === 'vertical') {
        scrollPosition = element.scrollTop
        scrollSize = element.scrollHeight - element.clientHeight
      } else if (scrollDirection === 'horizontal') {
        scrollPosition = element.scrollLeft
        scrollSize = element.scrollWidth - element.clientWidth
      }
    } else {
      scrollPosition = document.documentElement.scrollTop || document.body.scrollTop
      scrollSize = (document.documentElement.scrollHeight || document.body.scrollHeight) - document.documentElement.clientHeight
    }
    const percent = (scrollPosition / scrollSize) * 100
    let percentRange

    if (percent % stepSize === 0) {
      percentRange = percent
    } else if (percent % stepSize) {
      const currentPercentRange = percent - (percent % stepSize)

      if (currentPercentRange) {
        percentRange = percent - (percent % stepSize)
      }
    }

    const percentages = {}

    if (percentRange) {
      for (let i = 0; i < percentRange / stepSize; i++) {
        const currentPercent = (i + 1) * stepSize

        percentages[currentPercent] = false
      }
    } else if (percent === 0) {
      percentages[0] = false
    }
    const currentPercentages = state[categoryId] || {}
    const allPercentages = { ...percentages, ...currentPercentages }

    this.trackPercentages(allPercentages)
  }

  trackPercentages(percentages) {
    const { categoryId, categorySlug, trackCategoryScroll, actionType } = this.props
    const untrackedPercentages = Object.keys(percentages).filter((key) => percentages[key] === false)

    const updatedPercentages = {}
    Object.keys(percentages).forEach((key) => {
      updatedPercentages[key] = true
    })

    this.setState({
      [categoryId]: updatedPercentages
    })

    untrackedPercentages.forEach((percent) => {
      trackCategoryScroll({
        actionType,
        scrollDepth: Number(percent),
        categoryId,
        categorySlug,
      })
    })
  }

  render() {
    const { children, className } = this.props

    if (children) {
      return (
        <div className={classnames('categoryScrollContainer', { [className]: className })} onScroll={this.handleScroll}>
          {children}
        </div>
      )
    }

    return null
  }
}

CategoryScrollTracker.propTypes = {
  categoryId: PropTypes.string.isRequired,
  categorySlug: PropTypes.string.isRequired,
  trackCategoryScroll: PropTypes.func.isRequired,
  actionType: PropTypes.string.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  scrollDirection: PropTypes.string,
  stepSize: PropTypes.number,
}

CategoryScrollTracker.defaultProps = {
  children: null,
  className: null,
  scrollDirection: 'vertical',
  stepSize: 20,
}

export { CategoryScrollTracker }
