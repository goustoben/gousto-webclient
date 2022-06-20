import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import Slider from 'react-slick'
/*
Using require on the next few lines as there is an issue importing global styles
with our current configuration and ts-loader.
*/
// eslint-disable-next-line no-unused-vars
const reactSlickGlobalStyles = require('./ReactSlick.css')
// eslint-disable-next-line no-unused-vars
const carouselScssGlobalStyles = require('./Carousel.scss')
// eslint-disable-next-line no-unused-vars
const carouselCssGlobalStyles = require('./Carousel.css')

const propTypes = {
  arrows: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  dots: PropTypes.bool,
  infinite: PropTypes.bool,
  speed: PropTypes.number,
  slidesToShow: PropTypes.number,
  slidesToScroll: PropTypes.number,
  variableWidth: PropTypes.bool,
}

const defaultProps = {
  arrows: false,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  variableWidth: false,
}

export class Carousel extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isClient: false,
    }
  }

  componentDidMount() {
    this.onMount()
  }

  onMount = () => {
    this.setState({ isClient: true })
  }

  render() {
    const { children, ...settings } = this.props
    const { isClient } = this.state
    const childrenCount = React.Children.count(children)

    return (
      <div
        className={classnames(
          `carousel-items-${childrenCount}`,
          { 'carousel-no-js': !isClient },
          { 'carousel-dotted': settings.dots },
        )}
      >
        <Slider {...settings}>
          {children}
        </Slider>
      </div>
    )
  }
}

Carousel.propTypes = propTypes
Carousel.defaultProps = defaultProps
