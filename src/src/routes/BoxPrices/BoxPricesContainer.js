import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { getBoxPricesPageRedesign, getIsBoxPricesUserJourneyEnabled } from 'selectors/features'
import actions from 'actions'
import { boxPricesBoxSizeSelected } from 'actions/boxPrices'
import boxPricesQuery from './boxprices.gql'
import { BoxPrices } from './BoxPrices'

const mapStateToProps = (state) => ({
  tariffId: state.basket.get('tariffId', null),
  isBoxPricesPageRedesignEnabled: getBoxPricesPageRedesign(state),
  isBoxPricesUserJourneyEnabled: getIsBoxPricesUserJourneyEnabled(state)
})

const mapDispatchToProps = {
  basketNumPortionChange: actions.basketNumPortionChange,
  goToStep: actions.signupNextStep,
  boxPricesBoxSizeSelected
}

const BoxPricesWithData = graphql(boxPricesQuery, {
  options: ({ tariffId }) => (tariffId ? { variables: { tariff_id: tariffId } } : {})
})(BoxPrices)

export const BoxPricesContainer = connect(mapStateToProps, mapDispatchToProps)(BoxPricesWithData)
