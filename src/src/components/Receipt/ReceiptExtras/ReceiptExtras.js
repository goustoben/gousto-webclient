import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
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
      {items.size ? <ReceiptLine label="Sides and market items" /> : null}
      {items.map((item) => (
        <ReceiptLine key={getLabel(item)} label={getLabel(item)} style="truncateLabel">
          {getCost(item)}
        </ReceiptLine>
      ))}
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
