import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { client } from 'config/routes'
import { CTA, Loader } from 'goustouicomponents'
import typography from 'design-language/typography.module.css'
import { browserHistory } from 'react-router'
import { AwinPixel } from 'AwinPixel'
import { eventsList, isValidDate, transformSubHeadDate } from './utils'
import { ScheduleTimeline } from '../ScheduleTimeline'
import { SubscriptionTransparency } from '../SubscriptionTransparency'
import footerImage from './assets/footer.jpg'
import headerImage from './assets/header.jpg'
import css from './WelcomeToGousto.module.css'

export const WelcomeToGousto = ({
  whenCutoff,
  deliveryDate,
  trackWelcomeToGoustoButton,
  orderId,
}) => {
  const trackAndgoToMenu = () => {
    trackWelcomeToGoustoButton(orderId)
    browserHistory.push(`${client.menu}/${orderId}`)
  }

  return (
    <Fragment>
      <div className={css.container}>
        <img src={headerImage} alt="Sample dishes" className={css.headerImage} />
        <div className={css.contentWrapper}>
          <h1 className={css.title}>Now it’s time to choose your recipes!</h1>
          <p className={css.subtitle}>
            Thanks, your subscription is active and your first box will be delivered on{' '}
            {transformSubHeadDate(deliveryDate)}!
          </p>
          <div className={css.subHeading}>
            <h2 className={typography.fontStyleM}>What happens next?</h2>
          </div>
          {isValidDate(deliveryDate) ? (
            <ScheduleTimeline eventsList={eventsList(whenCutoff, deliveryDate)} />
          ) : (
            <div className={css.loaderWrapper}>
              <Loader color="Bluecheese" />
            </div>
          )}
        </div>
        <div className={css.ctaSection}>
          <CTA onClick={trackAndgoToMenu} isFullWidth="small-screens-only">
            Choose from over 50 recipes
          </CTA>
          <SubscriptionTransparency />
        </div>
      </div>
      <img src={footerImage} alt="Sample dishes" className={css.footerImage} />
      <AwinPixel />
    </Fragment>
  )
}

WelcomeToGousto.propTypes = {
  deliveryDate: PropTypes.string.isRequired,
  whenCutoff: PropTypes.string.isRequired,
  trackWelcomeToGoustoButton: PropTypes.func,
  orderId: PropTypes.number.isRequired,
}

WelcomeToGousto.defaultProps = {
  trackWelcomeToGoustoButton: () => {},
}
