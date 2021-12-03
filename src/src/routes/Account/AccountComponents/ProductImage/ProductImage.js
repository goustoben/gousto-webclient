import PropTypes from 'prop-types'
import React from 'react'
import css from './ProductImage.module.css'

const propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
}

const defaultProps = {
  src: '',
  alt: '',
}

class ProductImage extends React.PureComponent {
  render() {
    const { src, alt } = this.props

    return (
      <div className={css.imageContainer}>
        <img src={src} className={css.image} alt={alt} />
      </div>
    )
  }
}

ProductImage.propTypes = propTypes
ProductImage.defaultProps = defaultProps

export default ProductImage
