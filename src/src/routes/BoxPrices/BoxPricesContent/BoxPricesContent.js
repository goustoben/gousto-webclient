import React from 'react'
import classnames from 'classnames'

import Svg from 'Svg'
import css from './BoxPricesContent.css'
import config from 'config/boxprices'

const BoxPricesContent = () => (
  <div>
    <div className={css.container}>
      <div className={css.row}>
          {config.content.map((content, index) => (
            <div key={`box-prices-content-${index}`} className={css.content}>
              <h3 className={css.title}>{content.title}</h3>
              <p>{content.text}</p>
            </div>
          ))}
      </div>
      <div className={classnames(css.row, css.centered)}>
        <Svg className={css.icon} fileName="icon-hearts" />
      </div>
    </div>
    <div className={classnames(css.quotes, css.column)}>
      {config.quotes.map((quote, index) => (
        <blockquote key={`box-prices-quote-${index}`} className={css.quote}>
          <p>{quote.text}</p>
          <span className={css.source}>{quote.source}</span>
        </blockquote>
      ))}
    </div>
  </div>
)

export default BoxPricesContent
