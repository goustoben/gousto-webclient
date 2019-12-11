import PropTypes from 'prop-types'
import React from 'react'
import DOMPurify from 'dompurify'
import ReactMarkdown from 'react-markdown'
import css from './GenericScreen.css'
import CallToAction from '../CallToAction'
import Image from '../Image'
import TextArea from '../TextArea'

export function renderContent(contents = []) {
  return contents.map((contentItem, key) => {
    const { type, ...content } = contentItem
    let component = null

    switch (type) {
    case 'copy': {
      component = (content.copy &&
          <ReactMarkdown
            source={DOMPurify.sanitize(content.copy)}
            className={css.copy}
          />
      )
      break
    }
    case 'image': {
      component = (
          <Image {...content.image} />
      )
      break
    }
    case 'textarea': {
      component = (
          <TextArea {...content} />
      )
      break
    }
    case 'quote': {
      component = (
          <div className={css.quoteBlock}>
            <p className={css.quote}>{content.quote}</p>
            <p className={css.quote}>-{content.quoteAuthor}</p>
          </div>
      )
      break
    }
    default:
      component = null
    }

    return component ?
      <div
        className={css.contentItem}
        key={key}
      >
        {component}
      </div> :
      null
  })
}

export function renderActions(actions = []) {
  return actions.map((props, key) => (
    <CallToAction
      {...props}
      key={key}
    />
  ))
}

const SubscriptionPauseGenericScreen = ({ actions = [], allowCancel, content = [] }) => (
  <div className={css.container}>
    <div className={css.content}>
      {renderContent(content)}
    </div>

    <div className={actions.length === 1 ? css.bottomCentered : css.bottom}>
      {renderActions(actions)}
    </div>

    {allowCancel &&
      <div className={css.footer}>
        <CallToAction type="CancelLink" />
      </div>
    }
  </div>
)

SubscriptionPauseGenericScreen.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
    })
  ),
  allowCancel: PropTypes.bool,
  content: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf([
        'copy',
        'image',
        'textarea',
        'quote',
      ]),
    })
  ),
}

export default SubscriptionPauseGenericScreen
