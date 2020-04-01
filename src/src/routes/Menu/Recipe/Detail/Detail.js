import React from 'react'
import Immutable from 'immutable'
import PropTypes from 'prop-types'

import DefaultDetail from 'routes/Menu/Recipe/Detail/DefaultDetail'
import { FineDineInDetail } from 'routes/Menu/Recipe/Detail/FineDineInDetail'
import css from './Detail.css'

export class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = { scrolledPastPoint: false }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  }

  onScroll = () => {
    const threshold = 295
    const { scrolledPastPoint } = this.state

    if (window.pageYOffset < threshold && scrolledPastPoint) {
      this.setState({ scrolledPastPoint: false })
    }
    if (window.pageYOffset >= threshold && !scrolledPastPoint) {
      this.setState({ scrolledPastPoint: true })
    }
  }

  get detailComponent() {
    const { view } = this.props
    const { scrolledPastPoint } = this.state

    switch (view) {
    case 'fineDineInDetail':
      return <FineDineInDetail {...this.props} scrolledPastPoint={scrolledPastPoint} />
    default:
      return <DefaultDetail {...this.props} scrolledPastPoint={scrolledPastPoint} />
    }
  }

  render() {
    const { menuRecipeDetailVisibilityChange } = this.props

    return (
      <div onClick={() => { menuRecipeDetailVisibilityChange(false) }}>
        <div className={css.container} onClick={(e) => { e.stopPropagation() }}>
          {this.detailComponent}
        </div>
      </div>
    )
  }
}

Detail.propTypes = {
  media: PropTypes.instanceOf(Immutable.List),
  title: PropTypes.string,
  view: PropTypes.string,
  tag: PropTypes.string,
  count: PropTypes.number,
  average: PropTypes.number,
  per100Grams: PropTypes.instanceOf(Immutable.Map),
  perPortion: PropTypes.instanceOf(Immutable.Map),
  ingredients: PropTypes.instanceOf(Immutable.List),
  allergens: PropTypes.instanceOf(Immutable.List),

  stock: PropTypes.number,
  inBasket: PropTypes.bool,
  id: PropTypes.string,
  useWithin: PropTypes.string.isRequired,
  cookingTime: PropTypes.number.isRequired,
  availability: PropTypes.instanceOf(Immutable.List),
  cutoffDate: PropTypes.string,
  description: PropTypes.string,
  youWillNeed: PropTypes.instanceOf(Immutable.List),
  cuisine: PropTypes.string,
  diet: PropTypes.string,
  equipment: PropTypes.instanceOf(Immutable.List),

  menuRecipeDetailVisibilityChange: PropTypes.func,
  scrolledPastPoint: PropTypes.bool,
  surcharge: PropTypes.number,
  range: PropTypes.instanceOf(Immutable.Map),
  showCookingInstruction: PropTypes.bool.isRequired
}

export default Detail
