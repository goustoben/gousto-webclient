import { fromJS, Map } from 'immutable'
import React, { FC } from 'react'
import Loading from 'routes/Menu/Loading'
import { getProductLimitReached } from 'utils/basket'
import type { Product, ProductRecipePairing } from '../../types'
import { ProductListPairingsPresentation } from './ProductListPairings.presentation'

const availableNumberOfColumn = {
  2: '',
  4: 'fourColumn',
}

interface ProductListPairingsProps {
  basket: Map<number, [string, string]>
  productsCategories: Map<number, [string, string]>
  products: Map<number, [string, Product]>
  ageVerified: boolean
  toggleAgeVerificationPopUp: () => void
  numberOfColumn: 2 | 4
  trackingCategory: string
  productRecipePairings: ProductRecipePairing[]
}

const ProductListPairings: FC<ProductListPairingsProps> = (props) => {
  const {
    basket,
    products = null,
    productsCategories,
    toggleAgeVerificationPopUp,
    ageVerified = false,
    numberOfColumn = '2',
    trackingCategory,
    productRecipePairings,
  } = props

  const isLimitReached = (product: Product) => {
    const { id } = product
    const limitReachedResult = getProductLimitReached(
      id,
      basket,
      fromJS(products),
      productsCategories,
    )

    return limitReachedResult
  }

  return (
    <div>
      {productRecipePairings ? (
        <ProductListPairingsPresentation
          productRecipePairings={productRecipePairings}
          ageVerified={ageVerified}
          isLimitReached={isLimitReached}
          toggleAgeVerificationPopUp={toggleAgeVerificationPopUp}
          numberOfColumnClass={availableNumberOfColumn[numberOfColumn]}
          trackingCategory={trackingCategory}
        />
      ) : (
        <Loading />
      )}
    </div>
  )
}

export { ProductListPairings }
