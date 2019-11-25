import { connect } from 'react-redux'
import { OrderAddOns } from './OrderAddOns'

const mapStateToProps = () => ({})

const OrderAddOnsContainer = connect(mapStateToProps, {})(OrderAddOns)

export {
  OrderAddOnsContainer
}
