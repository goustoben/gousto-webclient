import React, { Fragment } from 'react'
import classnames from 'classnames'

import Svg from 'Svg'
import { content, quotes } from 'routes/BoxPrices/boxPricesConfig'
import css from './BoxPricesContent.css'

export const BoxPricesContent = () => (
  <Fragment>
    <div className={css.container}>
      <div className={css.row}>
        {content.map(contentItem => (
          <div key={`box-prices-content-${contentItem.title}`} className={css.content}>
            <h3 className={css.title}>{contentItem.title}</h3>
            <p>{contentItem.text}</p>
          </div>
        ))}
      </div>
      <div className={classnames(css.row, css.centered)}>
        <Svg className={css.icon} fileName="icon-hearts" />
      </div>
    </div>
    <div className={classnames(css.quotes, css.column)}>
      {quotes.map(quote => (
        <blockquote key={`box-prices-quote-${quote.source}`} className={css.quote}>
          <p>{quote.text}</p>
          <span className={css.source}>{quote.source}</span>
        </blockquote>
      ))}
    </div>
  </Fragment>
)
