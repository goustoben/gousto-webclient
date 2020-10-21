import { connect } from 'react-redux'

import { getIsMultiSkipEnabled } from 'selectors/features'
import { ModalContent } from './ModalContent'

const mapStateToProps = (state) => ({
  isMultiSkipEnabled: getIsMultiSkipEnabled(state)
})

export const ModalContentContainer = connect(mapStateToProps)(ModalContent)
