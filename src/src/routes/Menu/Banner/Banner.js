import PropTypes from 'prop-types';
import React from 'react';

import config from 'config/menu'
import BoostAndBalanceBanner from '../BoostAndBalanceBanner'
import FineDineInBanner from '../FineDineInBanner'
import TenToTableBanner from '../TenToTableBanner'

const tenToTableValid = () => (
	new Date() > new Date(config.tenToTableBanner.startDate)
)

const Banner = ({ isAuthenticated }) => {
	if (tenToTableValid()) {
		return <TenToTableBanner />
	}

	return (isAuthenticated) ? <FineDineInBanner /> : <BoostAndBalanceBanner />
}

Banner.propTypes = {
	isAuthenticated: PropTypes.bool,
}

Banner.defaultProps = {
	isAuthenticated: false,
}

export default Banner
