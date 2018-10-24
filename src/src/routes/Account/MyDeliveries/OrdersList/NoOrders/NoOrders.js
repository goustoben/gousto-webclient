import PropTypes from 'prop-types'
import React from 'react'
import SeeMenuSection from './SeeMenuSection'
import css from './NoOrders.css'
import classnames from 'classnames'
import Immutable from 'immutable' // eslint-disable no-caps
import { Button } from 'goustouicomponents'
import Link from 'Link'
import routes from 'config/routes'
import Content from 'containers/Content'

const NoOrders = ({ recipes, boxType }) => (
	<div>
		<div className={css.orderWrap}>
			<div className={classnames(css.order, css.noShadow)}>
				<p className={css.messageCopy}>
					<Content contentKeys="myDeliveriesNoOrdersBaseMessage" >
						<span>You have no upcoming deliveries</span>
					</Content>
				</p>
			</div>
		</div>
		<div className={css.orderWrap}>
			<div className={css.order}>
				<div>
					<p className={css.twrCopy}>
						<Content contentKeys="myDeliveriesNoOrdersBaseCopy" >
							<span>Check out a selection of this week's menu</span>
						</Content>
					</p>
				</div>
				<div>
					<SeeMenuSection recipes={recipes} boxType={boxType} />
				</div>
				<div className={css.buttonRow}>
					<Link to={`${routes.client.menu}`} clientRouted={false}>
						<Button color="secondary" noDecoration>
							See full menu
						</Button>
					</Link>
				</div>
			</div>
		</div>
	</div>
)

NoOrders.propTypes = {
	recipes: PropTypes.instanceOf(Immutable.List),
	boxType: PropTypes.string,
}
NoOrders.defaultProps = {
	recipes: Immutable.Map({}),
	boxType: '',
}

export default NoOrders
