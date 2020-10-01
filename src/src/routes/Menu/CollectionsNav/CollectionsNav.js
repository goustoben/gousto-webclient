import PropTypes from 'prop-types'
import React from 'react'
import { top, left } from 'scroll'
import Immutable from 'immutable'
import actual from 'actual'

import { ALL_RECIPES_COLLECTION_ID } from 'config/collections'
import { getScrollOffset } from 'utils/menu'
import { getWindow } from 'utils/window'
import { getElementOffsetTop } from 'utils/DOMhelper'
import { CollectionItemContainer } from '../components/CollectionItem'
import css from './CollectionsNav.css'

const MOBILE_BREAKPOINT = 543

class CollectionsNav extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      navBarOffsetTop: 0,
      scrolledPastPoint: false
    }
    this.eles = {}
  }

  componentDidMount() {
    const { menuCurrentCollectionId } = this.props
    this.centerCollection(menuCurrentCollectionId, false)

    window.addEventListener('scroll', this.onScroll)
    window.addEventListener('resize', this.onResize)
    if (this.eles.parent) {
      this.eles.parent.addEventListener('scroll', this.onNavScroll)
    }
    this.checkCollectionOffsetTop()

    this.checkScroll()
    this.checkSize(true)
    this.checkNavScroll()

    this.intervals = setInterval(() => {
      this.checkNavScroll()
      this.checkScroll()
      this.checkSize()
    }, 50)
  }

  componentWillUpdate({ menuCurrentCollectionId, menuCollections, isPolicyAccepted }) {
    if (isPolicyAccepted !== this.props.isPolicyAccepted) {
      this.checkCollectionOffsetTop()
    }
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
    if (this.hasScrolled) {
      this.hasScrolled = false
      const animationThreshold = 50
      const { navBarOffsetTop, scrolledPastPoint } = this.state
      const scrollState = getScrollOffset(navBarOffsetTop, animationThreshold, scrolledPastPoint)

      if (scrollState) {
        this.setState((state) => ({
          ...state,
          scrolledPastPoint: scrollState.scrolledPastPoint,
          scrollJumped: scrollState.scrollJumped,
        }))
      }
    }
  }

  checkSize = (force) => {
    const { menuCurrentCollectionId, menuCollections } = this.props
    if (this.hasResized || force) {
      this.hasResized = false
      this.showHideArrows()
      if (menuCollections.size > 0) {
        this.centerCollection(menuCurrentCollectionId, true)
      }
    }
  }

  showHideArrows = () => {
    const { menuCollections } = this.props
    if (menuCollections.size > 0) {
      const collectionIds = menuCollections
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
    const { menuCurrentCollectionId } = this.props
    if (this.hasNavScrolled) {
      this.hasNavScrolled = false
      this.evaluatePosition(menuCurrentCollectionId, this.eles.parent.scrollLeft)
    }
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
    const { menuCurrentCollectionId, menuCollections, collectionFilterChange } = this.props
    const prevIdx = menuCollections
      .map(collection => collection.get('id'))
      .toList()
      .indexOf(menuCurrentCollectionId) - 1

    let prevCollectionId = null
    if (prevIdx >= 0) {
      prevCollectionId = menuCollections.toList().getIn([prevIdx, 'id'], null)
    }

    if (getWindow().innerWidth < MOBILE_BREAKPOINT && prevCollectionId) {
      collectionFilterChange(prevCollectionId)
    } else {
      let offsetWidth = 0

      if (this.eles[prevCollectionId]) {
        offsetWidth = this.eles[prevCollectionId].offsetWidth
      } else if (this.eles[menuCurrentCollectionId]) {
        offsetWidth = this.eles[menuCurrentCollectionId].offsetWidth
      }

      if (this.eles.parent) {
        const target = this.eles.parent.scrollLeft - offsetWidth
        this.scrollNavbar(target, true, null, true)
      }
    }
  }

  nextCollection = () => {
    const { menuCurrentCollectionId, menuCollections, collectionFilterChange } = this.props
    const nextIdx = menuCollections
      .map(collection => collection.get('id'))
      .toList()
      .indexOf(menuCurrentCollectionId) + 1

    let nextCollectionId = null
    if (nextIdx <= menuCollections.size) {
      nextCollectionId = menuCollections.toList().getIn([nextIdx, 'id'], null)
    }
    if (getWindow().innerWidth < MOBILE_BREAKPOINT && nextCollectionId) {
      collectionFilterChange(nextCollectionId)
    } else {
      let offsetWidth = 0

      if (this.eles[nextCollectionId]) {
        offsetWidth = this.eles[nextCollectionId].offsetWidth
      } else if (this.eles[menuCurrentCollectionId]) {
        offsetWidth = this.eles[menuCurrentCollectionId].offsetWidth
      }

      if (this.eles.parent) {
        const target = this.eles.parent.scrollLeft + offsetWidth
        this.scrollNavbar(target, true, null, true)
      }
    }
  }

  changeCollection = (collectionId) => {
    const { collectionFilterChange } = this.props
    const { navBarOffsetTop } = this.state
    if (!collectionId) return
    collectionFilterChange(collectionId)
    const position = 0
    if (document && document.body) {
      if (actual('width', 'px') < 768) {
        top(document.body, position)
      }
    }
    if (collectionId !== ALL_RECIPES_COLLECTION_ID && window.pageYOffset > (navBarOffsetTop + 1)) {
      window.scrollTo(0, navBarOffsetTop)
    }
  }

  checkCollectionOffsetTop = () => {
    const offsetTopNavBar = getElementOffsetTop(document, '#collectionNavBar')
    this.setState({ ...this.state, navBarOffsetTop: offsetTopNavBar})
  }

  isElementVisible(ele, parent) {
    const rect = ele.getBoundingClientRect()

    return (
      rect.left >= 0
      && (rect.right + rect.width) <= (parent.innerWidth || document.documentElement.clientWidth)
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

  render() {
    const {
      menuCollections,
      menuCurrentCollectionId,
    } = this.props

    const {
      scrolledPastPoint,
      scrollJumped
    } = this.state

    let className = scrolledPastPoint ? css.navBarContainerFixed : css.navBarContainer
    if (scrollJumped) {
      className = css.navBarContainerFixedTransition
    }

    let leftArrowClassName = scrolledPastPoint ? css.arrowLeftFixed : css.arrowLeft
    let rightArrowClassName = scrolledPastPoint ? css.arrowRightFixed : css.arrowRight

    if (scrollJumped) {
      leftArrowClassName = css.arrowLeftFixedTransition
      rightArrowClassName = css.arrowRightFixedTransition
    }

    const { isAtStart, isAtEnd, showArrows } = this.state

    return (
      <div>
        <div className={className} id="collectionNavBar">
          {showArrows && !isAtStart ? <div className={leftArrowClassName} onClick={this.prevCollection} /> : null}
          <div className={css.nav} ref={ref => { this.eles.parent = ref }}>
            <div className={css.navBar}>
              {menuCollections
                .map(collection => {
                  const collectionId = collection.get('id')
                  const isCurrent = (menuCurrentCollectionId === collectionId)

                  return (
                    <CollectionItemContainer
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
                    </CollectionItemContainer>
                  )
                })
                .toArray()}
            </div>
          </div>
          {showArrows && !isAtEnd ? <div className={rightArrowClassName} onClick={this.nextCollection} /> : null}
        </div>
      </div>
    )
  }
}

CollectionsNav.propTypes = {
  menuCollections: PropTypes.instanceOf(Immutable.OrderedMap).isRequired,
  collectionFilterChange: PropTypes.func.isRequired,
  menuCurrentCollectionId: PropTypes.string,
  isPolicyAccepted: PropTypes.bool,
}

CollectionsNav.defaultProps = {
  menuCurrentCollectionId: null,
  isPolicyAccepted: false
}

export { CollectionsNav }
