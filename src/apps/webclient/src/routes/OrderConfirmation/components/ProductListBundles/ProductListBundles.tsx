import React, { FC } from 'react'

import Loading from 'routes/Menu/Loading'
import { Bundle } from 'routes/OrderConfirmation/types'

import { ProductBundle } from '../ProductBundle'

import css from './ProductListBundles.css'

interface ProductListBundlesProps {
  products: Bundle[] | null
  getFilteredProducts: (categoryId: string) => void
}

const ProductListBundles: FC<ProductListBundlesProps> = ({
  products = null,
  getFilteredProducts,
}) => (
  <>
    {products ? (
      <div data-testid="ProductListBundlesPresentation" className={css.productBundleList}>
        {products.map((bundleProduct: Bundle) => (
          <ProductBundle
            key={bundleProduct.id}
            bundleProduct={bundleProduct}
            getFilteredProducts={getFilteredProducts}
          />
        ))}
      </div>
    ) : (
      <Loading />
    )}
  </>
)

export { ProductListBundles }
