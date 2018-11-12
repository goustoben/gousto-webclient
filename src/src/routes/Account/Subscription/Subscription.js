import React from 'react'
import css from './Subscription.css'
import LinkButton from 'LinkButton'
import Link from 'Link'
import config from 'config/routes'
import Introduction from './Introduction'
import Preference from './Preference'

const Subscription = ({ startSubscriptionPause }) => (
	<div className={css.container}>
		<h2 className={css.heading}>Manage my subscription</h2>
		<Introduction />
		<Preference />
		<hr className={css.hr} />
		<div>
			<h2>Pause my subscription</h2>
			<p>Need a break? No problem. We have a few options for you.</p>
			<div className={css.subscriptionPausePanel}>
				<p>
					Going away or just need to skip a few boxes? You can skip as many boxes as you need from your deliveries.
				</p>
				<div className={css.linkWrapper}>
					<LinkButton
					  fill
					  to={config.client.myDeliveries}
					  clientRouted={false}
					  className={css.linkBase}
					>
						Skip boxes
					</LinkButton>
				</div>
				<p>
					Or you can <Link onClick={startSubscriptionPause} className={css.linkBase}>pause your subscription</Link> until further notice. You are still able to order one-off boxes even when your subscription is paused.
				</p>
			</div>
		</div>
	</div>
)

Subscription.propTypes = {
  startSubscriptionPause: React.PropTypes.func,
}

Subscription.defaultProps = {
  startSubscriptionPause: () => {},
}

export default Subscription
