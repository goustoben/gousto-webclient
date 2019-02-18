import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import Slider from 'react-slick'
import globalCss from './ReactSlick.css' // eslint-disable-line no-unused-vars
import scss from './Carousel.scss' // eslint-disable-line no-unused-vars
import css from './Carousel.css' // eslint-disable-line no-unused-vars

class Carousel extends React.PureComponent {
	static propTypes = {
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

	static defaultProps = {
	  arrows: false,
	  autoplay: true,
	  dots: true,
	  infinite: true,
	  speed: 500,
	  autoplaySpeed: 8000,
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  variableWidth: false,
	}

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
	  const childrenCount = React.Children.count(children)

	  return (
			<div
			  className={classnames(
			    `carousel-items-${childrenCount}`,
			    { 'carousel-no-js': !this.state.isClient },
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

export default Carousel
