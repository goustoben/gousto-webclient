import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import css from './RecipesImagery.module.css'

const RenderListItem = ({ items }) => {
  const slots = new Array(4).fill(null)

  return slots.map((slot, index) => {
    const image = items[index]

    return (
      // eslint-disable-next-line react/no-array-index-key
      <li className={css.listItem} key={index}>
        <div className={css.listItemContent}>
          {
            image
            && <img src={image.src} alt={image.alt} className={css.image} />
          }
        </div>
      </li>
    )
  })
}

const RecipesImagery = ({ items, is2x2 }) => {
  const classes = classnames(
    css.list,
    { [css.is2x2]: is2x2 },
  )

  return (
    <ul className={classes}>
      <RenderListItem items={items} />
    </ul>
  )
}

RecipesImagery.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  })),
  is2x2: PropTypes.bool,
}

RecipesImagery.defaultProps = {
  items: [],
  is2x2: false,
}

export { RecipesImagery }
