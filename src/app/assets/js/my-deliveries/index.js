import React from 'react'
import ReactDOM from 'react-dom'
import CONFIG from '@fe/gousto-config'
import Gousto from '@fe/gousto-generic'

import PreviewDeliveryDateContainer from './components/edit-delivery-date/PreviewDeliveryDateContainer'
import SidebarDeliveryDate from './components/edit-delivery-date/SidebarDeliveryDate'
import DiscountLabelContainer from './components/discount-label/DiscountLabelContainer'
import moment from 'moment'


const orderEditDateBoxes = document.querySelectorAll('.order-edit-date')

Gousto.globalAjaxSetup(CONFIG, window.pageData)

const $ = window.jQuery
const orders = []
for (let i = 0; i < orderEditDateBoxes.length; i++) {
	const orderEditDateBox = orderEditDateBoxes[i]
	const orignalOrder = JSON.parse($(orderEditDateBox).attr('data-order'))
	orders[i] = orignalOrder
	const sideBar = document.querySelector(`#orders-sidebar [data-order-id="${orignalOrder.id}"] .delivery-date`)

	const setOrder = (order) => {
		orders[i] = order
		ReactDOM.render(
			<SidebarDeliveryDate order={order} />,
			sideBar
		)
		if (document.querySelector(`.order-container[data-order-id="${order.id}"] .order-details-when_cutoff`)) {
			ReactDOM.render(
				(<span>{moment(order.when_cutoff).format('Do MMMM')}</span>),
				document.querySelector(`.order-container[data-order-id="${order.id}"] .order-details-when_cutoff`)
			)
		}
	}

	ReactDOM.render(
		<PreviewDeliveryDateContainer
			setOrder={setOrder}
			initialOrder={orignalOrder}
			orders={orders}
		/>,
		orderEditDateBox
	)
}

const ordersSidebarItems = document.querySelectorAll('.order-discount-info')

for (let i = 0; i < ordersSidebarItems.length; i++) {
	const orderSidebarItem = ordersSidebarItems[i]
	const order = JSON.parse($(orderSidebarItem).attr('data-order'))
	const prices = order.prices
	ReactDOM.render(
		<DiscountLabelContainer
			recipeTotal={Number(prices.recipe_total)}
			recipeDiscount={Number(prices.recipe_discount)}
		/>,
		orderSidebarItem
	)
}
