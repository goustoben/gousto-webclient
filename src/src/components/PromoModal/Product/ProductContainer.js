import Product from './Product'
import { connect } from 'react-redux'

const mapStateToProps = (state, props) => ({
	product: state.products.get(props.id),
})

export default connect(mapStateToProps, {})(Product)
