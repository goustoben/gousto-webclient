import React, { PropTypes } from 'react'
import Immutable from 'immutable' /* eslint-disable new-cap */
import PendingOrderReminderCss from './PendingOrderReminder.css'
import moment from 'moment'
import CallToAction from '../CallToAction'

const css = {}
Object.assign(css, PendingOrderReminderCss)

const PendingOrderReminder = ({ pendingOrders = Immutable.Map({}), committedOrders = Immutable.Map({}), orderCancelPending }) => (
	<div className={css.container}>
		<div className={css.content}>
			{
			  committedOrders
			    .toList()
			    .toJS()
			    .map(order => ({
			      date: moment(order.deliveryDate).format('dddd, Do MMMM'),
			    }))
			    .map(({ date }, i) => (
					<p key={i}>It is too late to cancel your box arriving on {date}. This will be delivered as normal.</p>
			    ))
			}
			{pendingOrders.size > 0 && <p>You have already chosen recipes for {(pendingOrders.size > 1) ? 'these boxes' : 'this box'}:</p>}
			{
			  pendingOrders
			    .toList()
			    .toJS()
			    .map(order => ({
			      date: moment(order.deliveryDate).format('dddd, Do MMMM'),
			      id: order.id,
			      numPeople: order.box.numPortions,
			      numRecipes: order.box.numRecipes,
			    }))
			    .map(({ date, numPeople, numRecipes }, i) => (
						<ul key={i}>
							<li>Box with {numRecipes} meals for {numPeople} people for delivery on {date}</li>
						</ul>
			    ))
			}
			{pendingOrders.size > 0 && <p>Do you wish to keep {pendingOrders.size > 1 ? 'these orders' : 'this order'}?</p>}
		</div>
		{pendingOrders.size > 0 ?
			<div className={css.bottom}>
				<CallToAction
				  fill={false}
				  width="auto"
				  pending={orderCancelPending}
				  text={`Cancel ${(pendingOrders.size > 1 ? 'orders' : 'order')}`}
				  type="CancelPendingOrders"
				/>
				<CallToAction
				  width="auto"
				  position="right"
				  text={`Keep ${(pendingOrders.size > 1 ? 'orders' : 'order')}`}
				  type="KeepPendingOrders"
				/>
			</div>
		  :
			<div>
				<CallToAction type="Dismiss" />
			</div>
		}
	</div>
)

PendingOrderReminder.propTypes = {
  pendingOrders: PropTypes.instanceOf(Immutable.Map),
  close: PropTypes.func,
  cancelPendingOrders: PropTypes.func,
  committedOrders: PropTypes.instanceOf(Immutable.Map),
  orderCancelPending: PropTypes.bool,
}

PendingOrderReminder.defaultProps = {
  close: () => {},
  cancelPendingOrders: () => {},
}

export default PendingOrderReminder
