import React, { FC } from 'react'
import Loading from 'routes/Menu/Loading'
import { ProductBundle } from '../ProductBundle'
import css from './ProductListBundles.css'
interface ProductListBundlesProps {
  products: any | null // types to come later
}

const ProductListBundles: FC<ProductListBundlesProps> = ({ products = null }) => (
  <>
    {products ? (
      <div data-testid="ProductListBundlesPresentation" className={css.productBundleList}>
        {products.map((product: any) => (
          <ProductBundle key={product.id} product={product} />
        ))}
      </div>
    ) : (
      <Loading />
    )}
  </>
)

export { ProductListBundles }
