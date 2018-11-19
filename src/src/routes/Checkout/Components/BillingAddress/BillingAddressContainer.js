import { connect } from 'react-redux'
import { change } from 'redux-form'

import { BillingAddress } from './BillingAddress'

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  change,
}

export const BillingAddressContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BillingAddress)
