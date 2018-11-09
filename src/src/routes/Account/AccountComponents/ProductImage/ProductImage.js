import React from 'react'
import css from './ProductImage.css'

class ProductImage extends React.PureComponent {
	static propTypes = {
	  src: React.PropTypes.string,
	  alt: React.PropTypes.string,
	}

	static defaultProps = {
	  src: '',
	  alt: '',
	}

	render() {
	  return (
			<div className={css.imageContainer}>
				<img src={this.props.src} className={css.image} alt={this.props.alt} />
			</div>
	  )
	}
}

export default ProductImage
