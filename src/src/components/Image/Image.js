import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import config from 'config/media'
import classNames from 'classnames'
import LazyLoad from 'react-lazyload'
import css from './Image.css'

class Image extends React.PureComponent {
	static propTypes = {
	  contain: PropTypes.bool,
	  className: PropTypes.string,
	  media: PropTypes.oneOfType([
	    PropTypes.instanceOf(Immutable.List),
	    PropTypes.string,
	  ]).isRequired,
	  onClick: PropTypes.func,
	  title: PropTypes.string,
	  maxMediaSize: PropTypes.number,
	  lazy: PropTypes.bool,
	  once: PropTypes.bool,
	  offset: PropTypes.number,
	  placeholder: PropTypes.node,
	}

	static defaultProps = {
	  contain: true,
	  onClick: () => {},
	  title: '',
	  lazy: false,
	  once: true,
	  offset: 200,
	}

	getSrcSet = (srcs) => (
	  srcs.reduce((str, src) => (
	    `${str} ${src.get('src')} ${src.get('width')}w,`
	  ), '')
	)

	getSizes = (srcs) => (
	  srcs.reduce((str, src) => (
	    `${str} (max-width: ${config.imageScale[src.get('width')]}px) ${src.get('width')}px,`
	  ), '')
	)

	getDefaultImage = (srcs, maxImageSize) => {
	  let image = Immutable.Map({})
	  if (srcs.size > 0) {
	    const sortedSrcs = srcs.sort((a, b) => b.get('width') - a.get('width'))
	    if (maxImageSize) {
	      image = sortedSrcs.getIn([0])
	    } else {
	      image = sortedSrcs.getIn([sortedSrcs.size / 2])
	    }
	  }

	  return image
	}

	render() {
	  const { maxMediaSize, media, lazy, once, offset, placeholder } = this.props
	  const className = classNames({
	    [this.props.className]: this.props.className,
	    [css.contain]: this.props.contain,
	  })

	  if (typeof media === 'string') {
	    return (
				<img
				  alt={this.props.title}
				  className={className}
				  onClick={this.props.onClick}
				  src={media}
				/>
	    )
	  }

	  if (media.size > 0) {
	    let srcs = media

	    if (maxMediaSize) {
	      const sortedSrcs = media.sort((a, b) => a.get('width', 0) - b.get('width'), 0)
	      srcs = sortedSrcs.filter(iSrc => iSrc.get('width') <= maxMediaSize)

	      if (srcs.size < media.size && srcs.last().get('width') < maxMediaSize) {
	        srcs = srcs.push(sortedSrcs.get(srcs.size))
	      }
	    }

	    const image = this.getDefaultImage(srcs, maxMediaSize)
	    const imageComponent = (
				<img
				  alt={this.props.title}
				  className={className}
				  onClick={this.props.onClick}
				  src={image.get('src', '')}
				  srcSet={this.getSrcSet(srcs)}
				/>
	    )

	    return (lazy) ? (
				<LazyLoad once={once} offset={offset} placeholder={placeholder} height={0}>
					{imageComponent}
				</LazyLoad>
	    ) : imageComponent
	  }

	  return null
	}
}

export default Image
