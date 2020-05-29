import React from 'react'
import PropTypes from 'prop-types'
import css from './WaveLinkHeader.css'

const WaveLinkHeader = ({ headerAttributes, changeCollectionById }) => {
  const { backgroundColor, color, headerImage, description } = headerAttributes

  const onClick = () => {
    changeCollectionById(headerAttributes.link.collectionId)
  }

  return (
    <div
      className={css.waveLinkHeader}
      onClick={onClick}
      onKeyPress={onClick}
      role="button"
      tabIndex={0}
      style={{
        backgroundColor: `${backgroundColor}`
      }}
      data-testing="waveLinkHeader"
    >
      <div className={css.arrowRightWrapper}>
        <span className={css.arrowRight} />
      </div>
      <div className={css.waveTop} />
      <div style={{color: `${color}`}} className={css.waveLinkInfo}>
        {headerImage[0]
          && (
          <img
            className={css.waveLinkTitleImage}
            src={headerImage[0].url}
            alt="Joe Wicks title"
            style={{
              width: headerImage[0].width,
              height: headerImage[0].height
            }}
          />
          )}
        <p className={css.waveLinkDescription}>
          {description}
        </p>
      </div>
      <div className={css.waveBottom} />
    </div>
  )
}

WaveLinkHeader.propTypes = {
  headerAttributes: PropTypes.shape({
    color: PropTypes.string,
    description: PropTypes.string,
    backgroundColor: PropTypes.string,
    headerImage: PropTypes.arrayOf(PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
      url: PropTypes.string
    })),
    link: PropTypes.shape({
      collectionId: PropTypes.string
    })
  }).isRequired,
  changeCollectionById: PropTypes.func.isRequired
}

export { WaveLinkHeader }
