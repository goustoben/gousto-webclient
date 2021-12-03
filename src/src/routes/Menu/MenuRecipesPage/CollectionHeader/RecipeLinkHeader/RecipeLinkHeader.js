import React from 'react'
import PropTypes from 'prop-types'
import Media from 'react-media'
import { LinkRecipeHolder } from './LinkRecipeHolder'
import css from './RecipeLinkHeader.module.css'
import { CollectionLinkChangeContainer } from '../../../components/CollectionLinkChange'

export const RecipeLinkHeader = ({ headerAttributes }) => {
  const { title, description, backgroundColor, color, titleColor, descriptionColor, images, fdiStyling, recipes, link, linkColor} = headerAttributes
  const viewAllLabel = 'View'

  return (
    <div
      className={css.recipeLinkHeader}
      style={{
        backgroundColor,
        color
      }}
      data-testing="recipeLinkHeader"
    >
      <div className={css.recipeLinkHeaderView}>
        <h2
          className={css.recipeLinkHeaderTitle}
          style={{color: titleColor}}
        >
          {title}
        </h2>
        <CollectionLinkChangeContainer
          className={css.recipeLinkHeaderViewAllLink}
          collectionId={link.collectionId}
          color={linkColor}
          label={viewAllLabel}
        />
      </div>
      <p className={css.recipeLinkHeaderDescription} style={{ color: descriptionColor }}>
        {description}
      </p>
      <Media queries={{
        twoColumns: '(max-width: 991px)',
        threeColumns: '(min-width: 992px) and (max-width: 1199px)',
        fourColumns: '(min-width: 1200px)'
      }}
      >
        {matches => <LinkRecipeHolder matches={matches} title={title} images={images} fdiStyling={fdiStyling} recipes={recipes} /> }
      </Media>
    </div>
  )
}

RecipeLinkHeader.propTypes = {
  headerAttributes: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    titleColor: PropTypes.string,
    linkColor: PropTypes.string,
    descriptionColor: PropTypes.string,
    images: PropTypes.shape({
      single: PropTypes.string,
      double: PropTypes.string,
    }),
    link: PropTypes.shape({
      collectionSlug: PropTypes.string,
      collectionId: PropTypes.string
    }),
    fdiStyling: PropTypes.bool,
    recipes: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
}
