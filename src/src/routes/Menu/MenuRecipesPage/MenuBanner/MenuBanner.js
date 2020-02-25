import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import menu from 'config/menu'
import { Banner } from '../../Banner'

const MenuBanner = ({ hideMenuBanner }) => {
  const now = moment()
  const switchoverTime = moment(menu.defaultMenu.switchoverDate)

  if (now.isSameOrAfter(switchoverTime, 'hour')) {
    if (hideMenuBanner) {
      return null
    }

    return <Banner type="default" />
  }

  return <Banner type="febyouary" />
}

MenuBanner.propTypes = {
  hideMenuBanner: PropTypes.bool.isRequired
}

export { MenuBanner }
