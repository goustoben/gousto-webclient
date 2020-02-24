import React from 'react'
import moment from 'moment'
import menu from 'config/menu'
import { Banner } from '../../Banner'

const MenuBanner = () => {
  const now = moment()
  const switchoverTime = moment(menu.noMenu.switchoverDate)

  if (now.isSameOrAfter(switchoverTime, 'hour')) {
    return null
  }

  return <Banner type="febyouary" />
}

export { MenuBanner }
