import React, { useState } from 'react'

import {
  Box,
  Button,
  ButtonColorVariant,
  ButtonSize,
  Color,
  Display,
  FontFamily,
  Heading6,
  Image,
  ModalProvider,
  Paragraph,
  Position,
} from '@gousto-internal/citrus-react'
import classnames from 'classnames'
import { useDispatch } from 'react-redux'

import { marketBundleTracking } from 'actions/orderConfirmation'
import { marketBundleAdded, marketBundleDetails } from 'actions/trackingKeys'
import { invokeHotjarEvent } from 'utils/hotjarUtils'

import type { BundleProduct } from '../../types/bundles'
import { FakeDoorModal } from '../FakeDoorModal/FakeDoorModal'
import { NewTag } from '../NewTag/NewTag'
import { ProductBundleDetails } from '../ProductBundleDetails/ProductBundleDetails'

import css from './ProductBundle.css'

type Props = {
  bundleProduct: {
    bundleImage: string
    bundleDescription: string
    bundleName: string
    bundlePrice: string
    bundleProducts: BundleProduct[]
    isNew?: boolean
  }
  getFilteredProducts: (categoryId: string) => void
}

const ProductBundle = ({ bundleProduct, getFilteredProducts }: Props) => {
  const [bundleDetailsToggle, setBundleDetailsToggle] = useState<boolean>(false)
  const [fakeDoorToggle, setFakeDoorToggle] = useState<boolean>(false)
  const { bundleDescription, bundleImage, bundleName, bundlePrice, bundleProducts, isNew } =
    bundleProduct
  const dispatch = useDispatch()

  const toggleDetailsModal = () => setBundleDetailsToggle(!bundleDetailsToggle)
  const toggleFakeDoorModal = () => setFakeDoorToggle(!fakeDoorToggle)

  const handleBundleDetailsPress = () => {
    dispatch(marketBundleTracking(marketBundleDetails, bundleProduct))
    toggleDetailsModal()
  }

  const handleFakeDoorPress = () => {
    invokeHotjarEvent(marketBundleAdded)
    dispatch(marketBundleTracking(marketBundleAdded, bundleProduct))
    toggleFakeDoorModal()
  }

  const renderNewTag = isNew && (
    <Position position="absolute" top={['8px', '16px']}>
      <NewTag />
    </Position>
  )

  return (
    <ModalProvider>
      <section className={css.productWrapper}>
        <Box display={Display.Flex} className={css.bundleDetails}>
          <button
            type="button"
            className={classnames(css.resetButtonStyle, css.bundleImage)}
            onClick={handleBundleDetailsPress}
          >
            <Image src={bundleImage} alt={bundleName} />
            {renderNewTag}
          </button>
          <Box display={Display.Flex} className={css.bundleContent}>
            <Box className={css.bundleContentFirstColumn}>
              <button
                type="button"
                className={classnames(css.resetButtonStyle, css.bundleInfo)}
                onClick={handleBundleDetailsPress}
              >
                <Heading6 className="bundleTitle" size={3}>
                  {bundleName}
                </Heading6>
                <Paragraph size={1} color={Color.ColdGrey_400} className={css.bundleDescription}>
                  {bundleDescription}
                </Paragraph>
              </button>
            </Box>
            {bundleProducts.map((product: BundleProduct) => (
              <h3 key={product.id} className={css.bundles}>
                {product.quantity} x {product.title}
              </h3>
            ))}
            <Box>
              <Box className={css.productButtonWrapper} role="button">
                <Heading6 fontFamily={FontFamily.Bold} size={1} className={css.bundlePrice}>
                  £{bundlePrice}
                </Heading6>
                <Button
                  colorVariant={ButtonColorVariant.Secondary}
                  size={ButtonSize.Medium}
                  onClick={handleFakeDoorPress}
                  width="100%"
                >
                  Add
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* eslint-disable react/jsx-props-no-spreading */}
        <ProductBundleDetails
          {...bundleProduct}
          close={toggleDetailsModal}
          isOpen={bundleDetailsToggle}
        />
        <FakeDoorModal
          {...bundleProduct}
          close={toggleFakeDoorModal}
          getFilteredProducts={getFilteredProducts}
          isOpen={fakeDoorToggle}
        />
      </section>
    </ModalProvider>
  )
}

export { ProductBundle }
