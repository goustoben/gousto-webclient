import React from 'react'
import PropTypes from 'prop-types'

import css from './ReadMoreText.css'

class ReadMoreText extends React.Component {
  constructor() {
    super()

    this.onReadMoreClick = this.onReadMoreClick.bind(this)

    this.state = { isExpanded: false }
  }

  onReadMoreClick(e) {
    e.preventDefault()
    this.setState({ isExpanded: true })
  }

  renderChunks() {
    const { lines, text } = this.props

    const breakpoints = [
      [40, '', css.screenSize1, css.readMore1],
      [55, css.screenSize1, css.screenSize2, css.readMore2],
      [70, css.screenSize2, css.screenSize3, css.readMore3],
      [95, css.screenSize3, css.screenSize4, css.readMore4],
    ]

    // trim whitespaces
    const fullText = text.replace(/\s/gi, ' ')
    let restTextClass = ''
    let readMoreClass = ''
    let start = 0
    const chunks = []

    for (let i = 0; i < breakpoints.length; i++) {
      const [maxLineLength, chunkClassName, restTextClassName, readMoreClassName] = breakpoints[i]
      const maxLength = maxLineLength * lines
      if (fullText.length > start && fullText.length > maxLength) {
        const shortenText = fullText.substr(start, maxLength - start)
        chunks.push(<span key={i} className={chunkClassName}>{shortenText}</span>)
        start = maxLength
        restTextClass = restTextClassName
        readMoreClass = readMoreClassName
      }
    }

    if (fullText.length > start && restTextClass) {
      chunks.push(<span key="rest-text" className={restTextClass}>{fullText.substr(start)}</span>)
    }

    if (readMoreClass) {
      chunks.push(
        <span key="read-more-link" className={readMoreClass}>
          {'… '}
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" onClick={this.onReadMoreClick}>Read more</a>
        </span>
      )
    }

    return chunks.length ? chunks : text
  }

  render() {
    const { text } = this.props
    const { isExpanded } = this.state

    return (
      <p>{ isExpanded ? text : this.renderChunks() }</p>
    )
  }
}

ReadMoreText.propTypes = {
  text: PropTypes.string.isRequired,
  lines: PropTypes.number,
}

ReadMoreText.defaultProps = {
  lines: 3,
}

export {
  ReadMoreText
}
