import { connect } from 'react-redux'
import { getIsBrandDesignEnabled } from 'selectors/features'
import { StepsGuide } from './StepsGuide'

const mapStateToProps = (state) => ({
  isBrandDesignEnabled: getIsBrandDesignEnabled(state),
})

export const StepsGuideContainer = connect(
  mapStateToProps,
)(StepsGuide)
