import React, { PropTypes } from 'react'
import Immutable from 'immutable'  /* eslint-disable new-cap */
import ReceiptLine from 'Receipt/ReceiptLine'
import { formatPrice } from 'utils/format'

const ReceiptExtras = ({ items, vatableDisclaimerKey }) => {
	const getCost = (item) => formatPrice((item.get('quantity') * item.get('listPrice')).toFixed(2))

	const getLabel = (item) => {
		let label = item.get('isVatable') ? vatableDisclaimerKey : ''
		label += `${item.get('quantity')} x ${item.get('title')}`

		return label
	}

	return (
		<div>
			{items.size ? <ReceiptLine label="Extras" /> : null}
			{items.map((item, key) =>
				<ReceiptLine key={key} label={getLabel(item)} style="truncateLabel">
					{getCost(item)}
				</ReceiptLine>
			)}
		</div>
	)
}

ReceiptExtras.defaultProps = {
	items: Immutable.Map(),
	vatableDisclaimerKey: '*',
}


ReceiptExtras.propTypes = {
	items: PropTypes.instanceOf(Immutable.Map),
	vatableDisclaimerKey: PropTypes.string,
}

export default ReceiptExtras
