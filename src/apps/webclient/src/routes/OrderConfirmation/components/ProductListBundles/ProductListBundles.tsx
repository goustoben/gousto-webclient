import React, { FC } from 'react'

import { marketBundlesVariant } from 'actions/trackingKeys'
import Loading from 'routes/Menu/Loading'
import { GradientMarketplaceHeader } from 'routes/OrderConfirmation/components/GradientMarketplaceHeader'
import { Bundle } from 'routes/OrderConfirmation/types'
import { invokeHotjarEvent } from 'utils/hotjarUtils'

import { ProductBundle } from '../ProductBundle'

import css from './ProductListBundles.css'

interface ProductListBundlesProps {
  products: Bundle[] | null
  getFilteredProducts: (categoryId: string) => void
}

const ProductListBundles: FC<ProductListBundlesProps> = ({
  products = null,
  getFilteredProducts,
}) => {
  if (products) invokeHotjarEvent(marketBundlesVariant)

  return (
    <>
      <GradientMarketplaceHeader />
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
}

export { ProductListBundles }
