import PropTypes from 'prop-types'
import React from 'react'
import Svg from 'Svg'
import css from './AppStoreLinks.css'

const AppStoreLinks = ({ appStoreId, playStoreId }) => (
	<div className={css.appStoreContainer}>
		<a href={`https://play.google.com/store/apps/details?id=${playStoreId}&utm_source=global_co&utm_medium=prtnr&utm_content=Mar2515&utm_campaign=PartBadge&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1`}>
			<Svg fileName="icon-Playstore" className={css.playStoreLink} />
		</a>
		<a href={`https://geo.itunes.apple.com/gb/app/gousto-uks-no1-recipe-kit/id${appStoreId}?mt=8`}>
			<Svg fileName="icon-Appstore" className={css.footerAppleAppstoreLink} />
		</a>

	</div>
)

AppStoreLinks.propTypes = {
	appStoreId: PropTypes.string.isRequired,
	playStoreId: PropTypes.string.isRequired,
}

export default AppStoreLinks
