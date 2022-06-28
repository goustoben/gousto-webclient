import React from 'react'
import { sendClientMetric } from 'routes/Menu/apis/clientMetrics'
import { use5RecipesAwareness } from '../use5RecipesAwareness'
import css from './FiveRecipesAwarenessBanner.css'

export const FiveRecipesAwarenessBanner = () => {
  const { isEnabledOnMyDeliveriesPage, hasSeenOnMyDeliveries, setMyDeliveriesAsSeen, isNewUser } = use5RecipesAwareness()
  const [isOpen, updateIsOpen] = React.useState(false)

  React.useEffect(() => {
    if (isEnabledOnMyDeliveriesPage && !hasSeenOnMyDeliveries) {
      updateIsOpen(isEnabledOnMyDeliveriesPage && !hasSeenOnMyDeliveries)
    }
  }, [isEnabledOnMyDeliveriesPage, hasSeenOnMyDeliveries])

  const onModalClose = () => {
    setMyDeliveriesAsSeen()
    updateIsOpen(false)
    sendClientMetric('my-deliveries-five-recipes-awareness-4M-2P', 1, 'Count')
  }

  if (isNewUser || !isOpen) {
    return null
  }

  return (
    <div className={css.container}>
    <div>
      <span className={css.infoIcon} />
    </div>
    <div>
      <p className={css.headerTitle}>We&apos;re full to the brim</p>
      <p className={css.headerText}>We can&apos;t take new customer orders right now, we&apos;re so sorry.</p>
      <ul className={css.bodyText}>
        <li>
          We&apos;re doing everything we can to get out more boxes.&nbsp;
          <a href={'#'}>Read more</a>
          .
        </li>
      </ul>
    </div>
  </div>
  )
}
