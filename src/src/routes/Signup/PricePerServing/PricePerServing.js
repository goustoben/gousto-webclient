import React from 'react'
import PropTypes from 'prop-types'
import { CTA, Heading } from 'goustouicomponents'
import typography from 'design-language/typography.module.css'
import css from './PricePerServing.module.css'

const PricePerServing = ({ portion, image, cost, onClick }) => {
  const { priceDiscounted, price } = cost

  // eslint-disable-next-line global-require, import/no-dynamic-require
  const imgStyle = { backgroundImage: `url(${require(`media/photos/${image}.png`)})` }

  return (
    <div className={css.card}>
      <div className={css.img} role="img" style={imgStyle} />
      <div className={css.body}>
        <div className={css.title}>
          <Heading size="fontStyleM" type="h2" hasMargin={false}>
            {portion} people
          </Heading>
        </div>
        <span className={typography.fontStyleXS}>from</span>
        <div className={css.row}>
          <div>
            <Heading size="fontStyleL" type="h3" hasMargin={false}>
              £{priceDiscounted === price ? price : priceDiscounted}
            </Heading>
          </div>
          {priceDiscounted !== price && (
            <div className={css.discountCol}>
              <del className={`${typography.fontStyleXXS} ${css.discount}`}>£{price}</del>
              <span className={typography.fontStyleS}>per serving</span>
            </div>
          )}
        </div>
        <div className={css.cardCTA}>
          <CTA isFullWidth onClick={onClick} testingSelector={`signupBoxSize${portion}Portions`}>
            Choose {portion}
            -person box
          </CTA>
        </div>
      </div>
    </div>
  )
}

PricePerServing.propTypes = {
  portion: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  cost: PropTypes.shape({
    priceDiscounted: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
}

export { PricePerServing }
