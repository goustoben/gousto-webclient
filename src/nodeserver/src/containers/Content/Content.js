import { connect } from 'react-redux'
import Content from 'Content'

function mapStateToProps(state) {
	return { state }
}

const ContentContainer = connect(mapStateToProps, {})(Content)

export default ContentContainer
