import { connect } from 'react-redux'
import { ProgressSoFar } from './ProgressSoFar'

const copy = {
  topLabel: 'Progress so far:',
  bottomLabel: '10% OFF for 1 month',
  countable: 'boxes'
}

const mapStateToProps = (state) => ({
  copy,
  total: 7,
  completed: 3,
  updateTo: 4,
  selected: 7
})

const mapDispatchToProps = {}

const ProgressSoFarContainer = connect(mapStateToProps, mapDispatchToProps)(ProgressSoFar)

export { ProgressSoFarContainer }
