import PropTypes from 'prop-types'
import React from 'react'
import { top, left } from 'scroll'
import Immutable from 'immutable'/* eslint-disable no-caps, new-cap */
import actual from 'actual'
import { getScrollOffset } from 'utils/menu'
import { getWindow } from 'utils/window'
import css from './CollectionsNav.css'
import CollectionItem from '../CollectionItem'

const MOBILE_BREAKPOINT = 543

class CollectionsNav extends React.PureComponent {
  static propTypes = {
    menuCollections: PropTypes.instanceOf(Immutable.OrderedMap).isRequired,
    collectionFilterChange: PropTypes.func.isRequired,
    menuCurrentCollectionId: PropTypes.string,
    featureSet: PropTypes.func.isRequired,
    masonryContainer: PropTypes.shape({
      offsetTop: PropTypes.number
    }),
    browser: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = { scrolledPastPoint: false }
    this.eles = {}
  }

  componentDidMount() {
    this.centerCollection(this.props.menuCurrentCollectionId, false)

    window.addEventListener('scroll', this.onScroll)
    window.addEventListener('resize', this.onResize)
    if (this.eles.parent) {
      this.eles.parent.addEventListener('scroll', this.onNavScroll)
    }

    this.checkScroll()
    this.checkSize(true)
    this.checkNavScroll()

    this.intervals = setInterval(() => {
      this.checkNavScroll()
      this.checkScroll()
      this.checkSize()
    }, 50)
  }

  componentWillUpdate({ menuCurrentCollectionId, menuCollections }) {
    if (menuCurrentCollectionId !== this.props.menuCurrentCollectionId) {
      this.centerCollection(menuCurrentCollectionId, true)
    }
    if (menuCollections.size !== this.props.menuCollections.size) {
      this.checkSize(true)
    }
  }

  componentDidUpdate({ menuCollections }) {
    if (menuCollections.size !== this.props.menuCollections.size) {
      this.showHideArrows()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)
    window.removeEventListener('resize', this.onResize)
    if (this.eles.parent) {
      this.eles.parent.removeEventListener('scroll', this.onNavScroll)
    }

    if (this.intervals) {
      clearInterval(this.intervals)
      this.intervals = null
    }
  }

  onResize = () => {
    this.hasResized = true
  }

  onScroll = () => {
    this.hasScrolled = true
  }

  onNavScroll = () => {
    this.hasNavScrolled = true
  }

  checkScroll = () => {
    const { browser } = this.props
    if (this.hasScrolled) {
      this.hasScrolled = false
      const threshold = (browser === 'mobile') ? 253 : 350
      const animationThreshold = 50
      const { scrolledPastPoint } = this.state
      const scrollState = getScrollOffset(threshold, animationThreshold, scrolledPastPoint)
      scrollState && this.setState({
        scrolledPastPoint: scrollState.scrolledPastPoint,
        scrollJumped: scrollState.scrollJumped
      })
    }
  }

  checkSize = (force) => {
    if (this.hasResized || force) {
      this.hasResized = false
      this.showHideArrows()
      if (this.props.menuCollections.size > 0) {
        this.centerCollection(this.props.menuCurrentCollectionId, true)
      }
    }
  }

  showHideArrows = () => {
    if (this.props.menuCollections.size > 0) {
      const collectionIds = this.props.menuCollections
        .map(collection => collection.get('id'))
        .toList()
      const lastCollectionId = collectionIds.last()
      const firstCollectionId = collectionIds.first()

      const firstCollectionVisible = this.isElementVisible(this.eles[firstCollectionId], this.eles.parent, true)
      const lastCollectionVisible = this.isElementVisible(this.eles[lastCollectionId], this.eles.parent)
      this.setState({ showArrows: (!firstCollectionVisible || !lastCollectionVisible) })
      this.evaluatePosition(null, this.eles.parent.scrollLeft)
    }
  }

  checkNavScroll = () => {
    if (this.hasNavScrolled) {
      this.hasNavScrolled = false
      this.evaluatePosition(this.props.menuCurrentCollectionId, this.eles.parent.scrollLeft)
    }
  }

  isElementVisible(ele, parent) {
    const rect = ele.getBoundingClientRect()

    return (
      rect.left >= 0 &&
      (rect.right + rect.width) <= (parent.innerWidth || document.documentElement.clientWidth)
    )
  }

  centerCollection(collectionId, animate) {
    if (this.eles[collectionId] && this.eles.parent) {
      const parentRect = this.eles.parent.getBoundingClientRect()
      const rect = this.eles[collectionId].getBoundingClientRect()
      const target = Math.round(this.eles[collectionId].offsetLeft - (parentRect.width * 0.5) + (rect.width * 0.5))
      this.scrollNavbar(target, animate, collectionId)
    }
  }

  scrollNavbar(tgt, animate, collectionId, jump) {
    let target = tgt
    const max = this.eles.parent.scrollWidth - this.eles.parent.clientWidth
    if (target < 0) {
      target = 0
    }
    if (target > max) {
      target = max
    }

    let duration = animate ? 325 : 0
    if (jump) {
      duration = 150
    }

    left(this.eles.parent, target, { duration })

    this.evaluatePosition(collectionId, target)
  }

  evaluatePosition = (newCollectionId, destinationScrollLeft) => {
    let isAtStart = false
    let isAtEnd = false

    if (destinationScrollLeft || destinationScrollLeft === 0) {
      const max = this.eles.parent.scrollWidth - this.eles.parent.clientWidth
      if (destinationScrollLeft === 0) {
        isAtStart = true
      }
      if (destinationScrollLeft >= max) {
        isAtEnd = true
      }
    }

    this.setState({
      isAtStart,
      isAtEnd,
    })
  }

  prevCollection = () => {
    const prevIdx = this.props.menuCollections
      .map(collection => collection.get('id'))
      .toList()
      .indexOf(this.props.menuCurrentCollectionId) - 1

    let prevCollectionId = null
    if (prevIdx >= 0) {
      prevCollectionId = this.props.menuCollections.toList().getIn([prevIdx, 'id'], null)
    }

    if (getWindow().innerWidth < MOBILE_BREAKPOINT && prevCollectionId) {
      this.props.collectionFilterChange(prevCollectionId)
    } else {
      let offsetWidth = 0

      if (this.eles[prevCollectionId]) {
        offsetWidth = this.eles[prevCollectionId].offsetWidth
      } else if (this.eles[this.props.menuCurrentCollectionId]) {
        offsetWidth = this.eles[this.props.menuCurrentCollectionId].offsetWidth
      }

      if (this.eles.parent) {
        const target = this.eles.parent.scrollLeft - offsetWidth
        this.scrollNavbar(target, true, null, true)
      }
    }
  }

  nextCollection = () => {
    const nextIdx = this.props.menuCollections
      .map(collection => collection.get('id'))
      .toList()
      .indexOf(this.props.menuCurrentCollectionId) + 1

    let nextCollectionId = null
    if (nextIdx <= this.props.menuCollections.size) {
      nextCollectionId = this.props.menuCollections.toList().getIn([nextIdx, 'id'], null)
    }
    if (getWindow().innerWidth < MOBILE_BREAKPOINT && nextCollectionId) {
      this.props.collectionFilterChange(nextCollectionId)
    } else {
      let offsetWidth = 0

      if (this.eles[nextCollectionId]) {
        offsetWidth = this.eles[nextCollectionId].offsetWidth
      } else if (this.eles[this.props.menuCurrentCollectionId]) {
        offsetWidth = this.eles[this.props.menuCurrentCollectionId].offsetWidth
      }

      if (this.eles.parent) {
        const target = this.eles.parent.scrollLeft + offsetWidth
        this.scrollNavbar(target, true, null, true)
      }
    }
  }

  changeCollection = (collectionId) => {
    const { browser } = this.props
    const threshold = (browser === 'mobile') ? 253 : 350
    if (!collectionId) return
    this.props.collectionFilterChange(collectionId)
    if (this.props.features && this.props.features.getIn(['menuStickyCollections', 'value'], false)) {
      this.props.featureSet('preferredCollection', this.props.menuCollections.getIn([collectionId, 'slug'], ''))
    }
    let position = 0
    if (this.props.masonryContainer && Number.isInteger(this.props.masonryContainer.offsetTop)) {
      position = this.props.masonryContainer.offsetTop
    }
    if (document && document.body) {
      if (actual('width', 'px') < 768) {
        top(document.body, position)
      }
    }
    if (collectionId !== 'ca8f71be-63ac-11e6-a693-068306404bab' && window.pageYOffset > (threshold + 1)) {
      window.scrollTo(0, threshold)
    }
  }

  render() {
    const {
      menuCollections,
      menuCurrentCollectionId,
    } = this.props

    let className = this.state.scrolledPastPoint ? css.navBarContainerFixed : css.navBarContainer
    if (this.state.scrollJumped) {
      className = css.navBarContainerFixedTransition
    }

    let leftArrowClassName = this.state.scrolledPastPoint ? css.arrowLeftFixed : css.arrowLeft
    let rightArrowClassName = this.state.scrolledPastPoint ? css.arrowRightFixed : css.arrowRight

    if (this.state.scrollJumped) {
      leftArrowClassName = css.arrowLeftFixedTransition
      rightArrowClassName = css.arrowRightFixedTransition
    }

    const { isAtStart, isAtEnd } = this.state

    return (
      <div>
        <div className={className}>
          {this.state.showArrows && !isAtStart ? <div className={leftArrowClassName} onClick={this.prevCollection} /> : null}
          <div className={css.nav} ref={ref => { this.eles.parent = ref }}>
            <div className={css.navBar}>
              {menuCollections
                .map(collection => {
                  const collectionId = collection.get('id')
                  const isCurrent = (menuCurrentCollectionId === collectionId)

                  return (
                  <CollectionItem
                    key={collectionId}
                    dataId={collectionId}
                    className={isCurrent ? css.currentItem : css.item}
                    onClick={() => { this.changeCollection(collectionId) }}
                    idenifier={`collectionnav-${collectionId}`}
                    element={ref => { this.eles[collectionId] = ref }}
                    collectionId={collectionId}
                    slug={collection.get('slug')}
                  >
                    <span className={css.itemTitle}>
                      {collection.get('shortTitle')}
                    </span>
                  </CollectionItem>
                  )
                })
                .toArray()}
            </div>
          </div>
          {this.state.showArrows && !isAtEnd ? <div className={rightArrowClassName} onClick={this.nextCollection} /> : null}
        </div>
      </div>
    )
  }
}

CollectionsNav.defaultProps = {
  menuCollections: Immutable.OrderedMap({}),
  masonryContainer: null,
}
export default CollectionsNav
