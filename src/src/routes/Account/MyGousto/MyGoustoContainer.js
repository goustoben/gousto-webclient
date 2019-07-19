import { connect } from 'react-redux'
import { userLoadOrder } from 'actions/user'

import MyGousto from './MyGousto'

function mapStateToProps() {
  return {

  }
}

const MyGoustoContainer = connect(mapStateToProps, {
  userLoadOrder
})(MyGousto)

export default MyGoustoContainer
