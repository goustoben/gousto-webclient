import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import Item from 'Item'
import { isAvailableRecipeList } from 'utils/recipe'
import Svg from 'Svg'
import classnames from 'classnames'
import { LayoutContentWrapper } from 'goustouicomponents'
import detailsCss from '../../BoxSummary/Details/Details.css'
import css from './ShortlistItem.css'

class ShortlistItem extends React.Component {
  static propTypes = {
    available: PropTypes.bool,
    onImageClick: PropTypes.func,
    onShortlistRemove: PropTypes.func,
    numPortions: PropTypes.number,
    recipesStore: PropTypes.instanceOf(Immutable.Map),
    shortlistIds: PropTypes.instanceOf(Immutable.Map),
    url: PropTypes.string,
  }

  static defaultProps = {
    available: false,
    onImageClick: () => { },
    onShortlistRemove: () => { },
    numPortions: 2,
    recipesStore: Immutable.Map(),
    shortlistIds: Immutable.Map(),
    url: "",
    showShortlistButton: true,
  }

  constructor() {
    super()
    this.state = {
      educationVisible: false,
    }
  }

  toggle = () => {
    const { educationVisible } = this.state
    this.setState({
      educationVisible: !educationVisible,
    })
  }

  render() {
    const { shortlistIds, recipesStore, numPortions, onShortlistRemove, available, url, onImageClick } = this.props
    const { educationVisible } = this.state

    const shortlist = isAvailableRecipeList(shortlistIds, recipesStore)
    const icon = !educationVisible ? css.infoIcon : css.crossIcon
    const whatIsThisText = !educationVisible ? 'What is this?' : 'Close'
    const showShortlistItems = !!shortlist.size

    return (
      <div className={shortlist ? css.shortlist : css.noShortlist}>
        <LayoutContentWrapper>
          <div className={detailsCss.row}>
            <span className={css.flex}>
              <p className={classnames(detailsCss.titleSection, css.align)}><Svg fileName={'icon_shortlist_heart_education'} className={css.heartIcon} />Shortlist</p>
              <div role='button' onClick={this.toggle} onKeyPress={this.toggle} tabIndex={0} className={shortlist.size ? css.showWhatIsThis : css.hide}>
                <span className={icon}></span>
                {whatIsThisText}
              </div>
            </span>
          </div>
          {(!shortlist.size || educationVisible) &&
            <div>
              <p className={css.educationHeader}>You can now shortlist recipes!</p>
              <p className={css.educationText}>
                Shortlisted recipes will appear here. Compare multiple recipes, and move them to and from your box to make your final selection.
              </p>
            </div>
          }
          {showShortlistItems && shortlist.map(recipe => (
            <Item
              key={recipe.get('id')}
              available={available}
              fromBox={false}
              media={recipe.get('media').getIn(['images', 0, 'urls'], Immutable.List([]))}
              onImageClick={() => onImageClick(recipe.get('id'))}
              onRemove={() => onShortlistRemove(recipe.get('id'), { view: 'boxSummaryMinus' })}
              quantity={numPortions}
              recipeId={recipe.get('id')}
              showShortlistButton
              title={recipe.get('title')}
              type="recipe"
              url={url}
            />
          ))}
        </LayoutContentWrapper>
      </div>)
  }
}

export default ShortlistItem
