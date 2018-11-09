import { graphql } from 'react-apollo'
import boxPricesQuery from './boxprices.gql'
import BoxPrices from './BoxPrices'

export default graphql(boxPricesQuery)(BoxPrices)
