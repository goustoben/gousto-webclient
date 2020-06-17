import React from 'react'
import PropTypes from 'prop-types'
import css from './SimpleLinkHeader.css'

const SimpleLinkHeader = ({ headerAttributes, onClick }) => {
  const { backgroundColor, color, headerImage, description } = headerAttributes

  return (
    <div
      className={css.simpleLinkHeader}
      onClick={onClick}
      onKeyPress={onClick}
      role="button"
      tabIndex={0}
      style={{
        backgroundColor: `${backgroundColor}`
      }}
      data-testing="simpleLinkHeader"
    >
      <div className={css.arrowRightWrapper}>
        <span className={css.arrowRight} />
      </div>
      <div style={{color: `${color}`}} className={css.simpleLinkInfo}>
        {headerImage[0]
          && (
          <img
            className={css.simpleLinkTitleImage}
            src={headerImage[0].url}
            alt="Promotional campaign title"
            style={{
              width: headerImage[0].width,
              height: headerImage[0].height
            }}
          />
          )}
        <p className={css.simpleLinkDescription}>
          {description}
        </p>
      </div>
    </div>
  )
}

SimpleLinkHeader.propTypes = {
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
      collectionSlug: PropTypes.string,
      collectionId: PropTypes.string
    })
  }).isRequired,
  onClick: PropTypes.func.isRequired
}

export { SimpleLinkHeader }
