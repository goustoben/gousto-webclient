import PropTypes from 'prop-types'
import React from 'react'
import Svg from 'Svg'
import css from './AppStoreLinks.module.css'

const AppStoreLinks = ({ appStoreId, playStoreId, onClick }) => {
  const appStoreHandler = () => onClick('appStore')
  const playStoreHandler = () => onClick('playStore')

  return (
    <div className={css.appStoreContainer}>
      <a
        className={css.playstoreLink}
        onClick={playStoreHandler}
        href={`https://play.google.com/store/apps/details?id=${playStoreId}&utm_source=global_co&utm_medium=prtnr&utm_content=Mar2515&utm_campaign=PartBadge&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1`}
      >
        <Svg label="play store" fileName="icon-Playstore-bw" className={css.playStoreSvg} />
      </a>
      <a
        className={css.appstoreLink}
        onClick={appStoreHandler}
        href={`https://geo.itunes.apple.com/gb/app/gousto-uks-no1-recipe-kit/id${appStoreId}?mt=8`}
      >
        <Svg label="app store" fileName="icon-Appstore-bw" className={css.footerAppleAppstoreSvg} />
      </a>

    </div>
  )
}

AppStoreLinks.propTypes = {
  appStoreId: PropTypes.string.isRequired,
  playStoreId: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

AppStoreLinks.defaultProps = {
  onClick: () => {}
}

export { AppStoreLinks }
