import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import css from './GradientInfoHeader.css'

const getGradientImageSrc = (headerAttributes, property) => {
  if (headerAttributes[property] && headerAttributes[property][0]) {
    return headerAttributes[property][0].url
  }

  return null
}

const GradientInfoHeader = ({ headerAttributes }) => {
  const { gradientColor, color, headerImage, description } = headerAttributes

  return (
    <div
      className={css.gradientInfoHeader}
    >
      <div className={css.gradientImageBackground}>
        <img className={css.gradientImage} src={getGradientImageSrc(headerAttributes, 'image')} alt="Joe Wicks" />
        <div
          className={classnames(css.gradientBackground, css.hideMobile)}
          style={{
            backgroundImage: `linear-gradient(270deg, rgba(0, 83, 199, 0) 20%, ${gradientColor} 30%)`,
          }}
        />
        <div
          className={classnames(css.gradientBackground, css.hideDesktop)}
          style={{
            backgroundImage: `linear-gradient(270deg, rgba(0, 83, 199, 0) 26.58%, ${gradientColor} 65.45%)`,
          }}
        />
        <div
          className={css.gradientText}
          style={{
            color: `${color}`
          }}
        >
          {
            headerImage[0]
            && (
            <img
              src={getGradientImageSrc(headerAttributes, 'headerImage')}
              alt="Joe Wicks Title"
              style={{width: headerImage[0].width, height: headerImage[0].height}}
              className={css.gradientTitleImage}
            />
            )
          }
          <p className={css.gradientDescription}>
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

GradientInfoHeader.propTypes = {
  headerAttributes: PropTypes.shape({
    color: PropTypes.string,
    description: PropTypes.string,
    gradientColor: PropTypes.string,
    headerImage: PropTypes.arrayOf(PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
      url: PropTypes.string
    })),
    image: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string
    })),
    imageLocation: PropTypes.string,
  }).isRequired
}

export { GradientInfoHeader }
