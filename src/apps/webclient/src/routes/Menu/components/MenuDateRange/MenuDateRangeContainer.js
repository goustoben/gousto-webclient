import { connect } from 'react-redux'
import { MenuDateRange } from './MenuDateRange'
import { getMenuDateRangeText } from './utils'

const mapStateToProps = (state) => {
  const basketDate = state.basket.get('date')
  const text = getMenuDateRangeText(basketDate)

  return {
    text,
  }
}

export const MenuDateRangeContainer = connect(mapStateToProps)(MenuDateRange)
