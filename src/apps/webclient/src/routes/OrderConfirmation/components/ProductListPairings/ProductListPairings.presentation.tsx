import React, { FC } from 'react'

import { Box } from '@gousto-internal/citrus-react'

import type { ProductRecipePairing } from '../../types'
import { Product } from '../Product'

import css from './ProductListPairings.css'

interface ProductListPairingsProps {
  ageVerified: boolean
  isLimitReached: any
  toggleAgeVerificationPopUp: () => void
  numberOfColumnClass: string
  trackingCategory: string
  productRecipePairings: ProductRecipePairing[]
}

const ProductListPairingsPresentation: FC<ProductListPairingsProps> = ({
  ageVerified = false,
  isLimitReached,
  toggleAgeVerificationPopUp,
  numberOfColumnClass = '',
  trackingCategory,
  productRecipePairings,
}) => (
  <>
    {productRecipePairings.map((productRecipePairing) => (
      <div key={productRecipePairing.recipeId}>
        {productRecipePairing.products.size > 0 ? (
          <Box display="flex" className={css.recipeBox}>
            <img
              className={css.productImage}
              src={productRecipePairing.media.getIn([0, 'urls', 0, 'src'])}
              alt={productRecipePairing.title}
            />
            <div className={css.recipeHeader}>
              <h5 className={css.title}>{productRecipePairing.title}</h5>
              <p>pairs perfectly with...</p>
            </div>
          </Box>
        ) : null}

        <div className={css.productList}>
          {productRecipePairing.products.map((product: any) => {
            const limitReached = isLimitReached(product.toJS())

            return (
              <Product
                key={product.get('id')}
                product={product.toJS()}
                limitReached={limitReached}
                ageVerified={ageVerified}
                numberOfColumnClass={numberOfColumnClass}
                toggleAgeVerificationPopUp={toggleAgeVerificationPopUp}
                category={trackingCategory}
              />
            )
          })}
        </div>
      </div>
    ))}
  </>
)

export { ProductListPairingsPresentation }
