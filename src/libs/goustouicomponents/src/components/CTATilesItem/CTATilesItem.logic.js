import React from 'react'
import PropTypes from 'prop-types'
import css from './CTATilesItem.module.css'

const propTypes = {
  children: PropTypes.node.isRequired,
  image: PropTypes.string,
  onClick: PropTypes.func,
  target: PropTypes.oneOf(['_blank', '_self', '_parent', '_top']),
  testingSelector: PropTypes.string,
  url: PropTypes.string.isRequired,
}

const defaultProps = {
  image: null,
  onClick: () => {},
  target: null,
  testingSelector: null,
}

const onClickHandler = (event, onClick, url) => {
  event.preventDefault()
  onClick()

  window.location.assign(url)
}

const CTATilesItem = ({
  children, image, onClick, target, testingSelector, url,
}) => (
  <a
    className={css.wrapper}
    data-testing={testingSelector}
    href={url}
    onClick={(event) => onClickHandler(event, onClick, url)}
    target={target}
  >
    {image && <img className={css.image} src={image} alt="" />}
    <span>{children}</span>
  </a>
)

CTATilesItem.propTypes = propTypes
CTATilesItem.defaultProps = defaultProps

export { CTATilesItem }
