import React, { useState } from 'react'

import {
  Box,
  Button,
  ButtonColorVariant,
  ButtonSize,
  Display,
  FontFamily,
  Heading6,
  Image,
  ModalProvider,
  Paragraph,
} from '@gousto-internal/citrus-react'
import classnames from 'classnames'

import { FakeDoorModal } from '../FakeDoorModal/FakeDoorModal'
import { ProductBundleDetails } from '../ProductBundleDetails/ProductBundleDetails'

import css from './ProductBundle.css'

interface Props {
  bundleProduct: {
    bundleImage: string
    bundleDescription: string
    bundleName: string
    bundlePrice: string
    bundleProducts: any[]
  }
}

const ProductBundle = ({ bundleProduct }: Props) => {
  const [bundleDetailsToggle, setBundleDetailsToggle] = useState<boolean>(false)
  const [fakeDoorToggle, setFakeDoorToggle] = useState<boolean>(false)
  const { bundleDescription, bundleImage, bundleName, bundlePrice, bundleProducts } = bundleProduct

  const toggleDetailsModal = () => setBundleDetailsToggle(!bundleDetailsToggle)
  const toggleFakeDoorModal = () => setFakeDoorToggle(!fakeDoorToggle)

  return (
    <ModalProvider>
      <section className={css.productWrapper}>
        <Box display={Display.Flex} className={css.bundleDetails}>
          <button
            type="button"
            className={classnames(css.resetButtonStyle, css.bundleImage)}
            onClick={toggleDetailsModal}
          >
            <Image src={bundleImage} alt={bundleName} />
          </button>
          <Box display={Display.Flex} className={css.bundleContent}>
            <Box className={css.bundleContentFirstColumn}>
              <button
                type="button"
                className={classnames(css.resetButtonStyle, css.bundleInfo)}
                onClick={toggleDetailsModal}
              >
                <Heading6 className="bundleTitle" size={3}>
                  {bundleName}
                </Heading6>
                <Paragraph className={css.bundleDescription}>{bundleDescription}</Paragraph>
              </button>
            </Box>
            {bundleProducts.map((product: any) => (
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
                  onClick={toggleFakeDoorModal}
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
        <FakeDoorModal {...bundleProduct} close={toggleFakeDoorModal} isOpen={fakeDoorToggle} />
      </section>
    </ModalProvider>
  )
}

export { ProductBundle }
