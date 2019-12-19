import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import boxPricesQuery from './boxprices.gql'
import BoxPrices from './BoxPrices'

function mapStateToProps({basket}) {
  return {
    tariffId: basket.get('tariffId', null)
  }
}

const BoxPricesWithData = graphql(boxPricesQuery, {
  options: ({ tariffId }) => (tariffId ? { variables: { tariff_id: tariffId } } : {})
})(BoxPrices)

export default connect(mapStateToProps)(BoxPricesWithData)
