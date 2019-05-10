import PropTypes from 'prop-types'
import React from 'react'
import { getNewTag } from 'utils/recipe'
import css from './Rating.css'
import InfoBadge from '../InfoBadge'

class RecipeRating extends React.Component {

  static propTypes = {
    count: PropTypes.number,
    average: PropTypes.number,
    view: PropTypes.string,
  }

  static defaultProps = {
    count: 0,
    average: 0,
  }

  showStar(avg) {
    let i
    const stars = []
    const avgRounded = Math.round(avg)
    const avgFloored = Math.floor(avg)
    for (i = 0; i < avgFloored; i++) {
      stars.push(<span className={css.starFull} key={i + 1} />)
    }
    if (avgRounded > avgFloored) {
      stars.push(<span className={css.starHalf} key={avgRounded} />)
      i++
    }
    for (i; i < 5; i++) {
      stars.push(<span className={css.starEmpty} key={i + 1} />)
    }

    return stars
  }

  render() {
    if (this.props.count > 0) {
      return (
        <span className={css.ratingContainer}>
          <span className={css.starColor}>
            {this.showStar(this.props.average)}
          </span>
          {this.props.view !== 'simple' ? <span className={css.description}> {this.props.count} reviews</span> : null}
        </span>
      )
    }

    const newTag = getNewTag(this.props.count, this.props.view)

    return (
      <span>
        {newTag ? <InfoBadge newRecipe>{newTag}</InfoBadge> : null}
      </span>
    )
  }
}

export default RecipeRating
