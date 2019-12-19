import { connect } from 'react-redux'
import Product from './Product'

const mapStateToProps = (state, props) => ({
  product: state.products.get(props.id),
})

export default connect(mapStateToProps, {})(Product)
