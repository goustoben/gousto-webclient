import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { getBoxPricesPageRedesign } from 'selectors/features'
import actions from 'actions'
import boxPricesQuery from './boxprices.gql'
import { BoxPrices } from './BoxPrices'

const mapStateToProps = (state) => ({
  tariffId: state.basket.get('tariffId', null),
  isBoxPricesPageRedesignEnabled: getBoxPricesPageRedesign(state),
})

const BoxPricesWithData = graphql(boxPricesQuery, {
  options: ({ tariffId }) => (tariffId ? { variables: { tariff_id: tariffId } } : {})
})(BoxPrices)

export default connect(mapStateToProps, {
  basketNumPortionChange: actions.basketNumPortionChange,
  goToStep: actions.signupNextStep
})(BoxPricesWithData)
