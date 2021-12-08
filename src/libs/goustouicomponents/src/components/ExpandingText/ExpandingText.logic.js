import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { fourNumbersPropType } from '../../utils/prop-types'
import css from './ExpandingText.module.css'

class ExpandingText extends React.Component {
  constructor() {
    super()

    this.onReadMoreClick = this.onReadMoreClick.bind(this)

    this.state = { isExpanded: false }
  }

  onReadMoreClick(e) {
    e.preventDefault()
    this.setState({ isExpanded: true })
  }

  parseChunks() {
    const { lines, charsPerLine, children } = this.props
    const cuttingPoints = [0, ...charsPerLine].map((item) => item * lines)
    const fullText = children.replace(/\s/gi, ' ')

    const slicedFullText = cuttingPoints.map((cuttingPoint, index) => {
      const beginningOfCut = cuttingPoints[index]
      const endOfCut = cuttingPoints[index + 1]

      return fullText.substring(beginningOfCut, endOfCut) || null
    }).filter((item) => item !== null)

    return slicedFullText
  }

  renderChunks() {
    const substrings = this.parseChunks()

    const slicedElements = substrings.map((substring, index) => (
      <span key={substring} className={classnames(css.chunk, css[`chunk-${index}`])}>
        {substring}
      </span>
    ))

    if (slicedElements.length > 1) {
      slicedElements.push((
        <span key="readMore" className={classnames(css.readMoreWrapButton, css[`readMoreWrapButtonChunk-${slicedElements.length}`])}>
          {'… '}
          <button type="button" className={css.readMoreButton} onClick={this.onReadMoreClick}>Read more</button>
        </span>
      ))
    }

    return slicedElements
  }

  render() {
    const { isExpanded } = this.state

    return (
      <p className={classnames(css.readMoreWrapper, { [css.isExpanded]: isExpanded })}>
        { this.renderChunks() }
      </p>
    )
  }
}

ExpandingText.propTypes = {
  children: PropTypes.string.isRequired,
  lines: PropTypes.number,
  charsPerLine: fourNumbersPropType,
}

ExpandingText.defaultProps = {
  lines: 3,
  charsPerLine: [40, 55, 70, 95],
}

export { ExpandingText }
