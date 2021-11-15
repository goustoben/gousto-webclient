import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
import { browserHistory } from 'react-router'
import ImageSelection from 'ImageSelection'
import LinkButton from 'LinkButton'
import SectionHeader from 'SectionHeader'
import config from 'config'
import css from './List.css'

const productsRoute = config.routes.client.orderConfirmation

const ProductList = ({ orderId, products, number, onProductClick, isGoustoOnDemandEnabled }) => (
  <article className={classNames(css.content, { [css.goustoOnDemandContainer]: isGoustoOnDemandEnabled })}>
    {!isGoustoOnDemandEnabled && (
      <SectionHeader title="Online Shop" type="minorArticle">
        Here you can add lovely wines, craft beers, delicious desserts, staples, kitchen tools, and treats from artisan suppliers.
      </SectionHeader>
    )}
    <ImageSelection
      content={products.slice(0, number).toArray()}
      onImageClick={(itemId) => (
        isGoustoOnDemandEnabled
          ? browserHistory.push(productsRoute.replace(':orderId', orderId))
          : onProductClick(itemId)
      )}
    />
    <div className={css.button}>
      <LinkButton
        to={productsRoute.replace(':orderId', orderId)}
        clientRouted={false}
      >
        Browse Online Shop
      </LinkButton>
    </div>
  </article>
)

ProductList.propTypes = {
  products: PropTypes.instanceOf(Immutable.List),
  onProductClick: PropTypes.func,
  number: PropTypes.number,
  orderId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  isGoustoOnDemandEnabled: PropTypes.bool,
}

ProductList.defaultProps = {
  products: new Immutable.List(),
  number: 6,
  onProductClick: () => {},
  isGoustoOnDemandEnabled: false,
}

export default ProductList
