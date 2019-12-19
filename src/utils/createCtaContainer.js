import { connect } from 'react-redux'
import { Button } from 'goustouicomponents'
import Link from 'Link'

export default function createCtaContainer({ action, text, type, additionalProps } = {}) {
  const mapStateToProps = (state, ownProps) => ({
    ...additionalProps,
    ...ownProps,
    children: ownProps.text || text,
  })

  const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => action(dispatch, ownProps),
  })

  return connect(mapStateToProps,
    mapDispatchToProps,
  )(type === 'Link' ? Link : Button)
}
