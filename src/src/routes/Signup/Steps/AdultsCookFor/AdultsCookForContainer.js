import { connect } from 'react-redux'
import PeopleCookFor from '../PeopleCookFor'
import actions from 'actions'

function mapStateToProps() {
  return {
    header: 'How many adults do you cook for?',
    text: 'This helps us to work out which box size suits you best.',
  }
}

const AdultsCookForContainer = connect(mapStateToProps, {
  numPeopleChange: (numAdults) => actions.basketNumPeopleChange({ numAdults }),
})(PeopleCookFor)

export default AdultsCookForContainer
