import React from 'react'

const withScroll = ({ propName, height }) => (Component) =>
  class WithScroll extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        scrolledPastPoint: false,
      }
      this.ticking = false
    }

    componentDidMount() {
      window.addEventListener('scroll', this.scrollListener)
    }

    componentWillUnmount() {
      const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame
      window.removeEventListener('scroll', this.scrollListener)
      cancelAnimationFrame(this.requestAnimationFrame)
    }

    scrollListener = () => {
      // Polyfill for different browser requestAnimationFrame API
      const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame
        || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame

      const lastKnownScrollPosition = window.scrollY

      if (!this.ticking) {
        this.requestAnimationFrame = requestAnimationFrame(() => {
          const scrolledPastPoint = height < lastKnownScrollPosition
          this.setState({
            scrolledPastPoint,
          })
          this.ticking = false
        })
        this.ticking = true
      }
    }

    render() {
      const { scrolledPastPoint } = this.state
      const scrollProp = { [propName || 'scrolledPastPoint']: scrolledPastPoint }

      return <Component {...this.props} {...scrollProp } />
    }
  }

export default withScroll
