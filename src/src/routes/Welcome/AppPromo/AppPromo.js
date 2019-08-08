import React from 'react'
import { Button } from 'goustouicomponents'
import css from './AppPromo.css'

const AppPromo = () => {
  return (
    <div className={css.container}>
      <div><img className={css.phoneImage} src={require('media/images/app_promo_phone.png')} alt=""/></div>
      <div className={css.content}>
        <ul className={css.list}>
          <li><span className={css.bullet}><i className={css.tick}/></span>Get notified when the new menu is out</li>
          <li><span className={css.bullet}><i className={css.tick}/></span>Follow the status of your orders on the go</li>
          <li><span className={css.bullet}><i className={css.tick}/></span>Find all your recipes in your own cookbook</li>
        </ul>
        <a data-testing="appBannerCTA" className={css.appLink} href="https://gousto.co.uk/apps">
          <Button noDecoration>Get the app now</Button>
        </a>
      </div>
    </div>
  )
}

export { AppPromo }