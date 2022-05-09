import React from 'react'
import PropTypes from 'prop-types'
import { Waves } from './components/Waves'
import css from './WaveLinkHeader.css'

const WaveLinkHeader = ({ headerAttributes, onClick }) => {
  const {
    backgroundColor,
    color,
    headerImage,
    description,
    link: { collectionSlug },
    waveColor,
  } = headerAttributes

  return (
    <div className={css.waveLinkHeaderContanier}>
      <div
        className={css.waveLinkHeader}
        onClick={onClick}
        onKeyPress={onClick}
        role="button"
        tabIndex={0}
        data-testing="waveLinkHeader"
        style={{
          backgroundColor: `${backgroundColor}`,
        }}
      >
        <div className={css.arrowRightWrapper}>
          <span className={css.arrowRight} style={{ color }} />
        </div>
        <div style={{ color: `${color}` }} className={css.waveLinkInfo}>
          {headerImage[0] && (
            <img
              className={css.waveLinkTitleImage}
              src={headerImage[0].url}
              alt={collectionSlug}
              style={{
                width: headerImage[0].width,
                height: headerImage[0].height,
              }}
            />
          )}
          <p className={css.waveLinkDescription}>{description}</p>
        </div>
        <Waves fillColor={waveColor} />
      </div>
    </div>
  )
}

WaveLinkHeader.propTypes = {
  headerAttributes: PropTypes.shape({
    color: PropTypes.string,
    description: PropTypes.string,
    backgroundColor: PropTypes.string,
    headerImage: PropTypes.arrayOf(
      PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number,
        url: PropTypes.string,
      }),
    ),
    link: PropTypes.shape({
      collectionId: PropTypes.string,
      collectionSlug: PropTypes.string,
    }),
    waveColor: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
}

export { WaveLinkHeader }
