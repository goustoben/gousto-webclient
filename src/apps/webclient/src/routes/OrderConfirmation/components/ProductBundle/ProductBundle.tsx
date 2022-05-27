import React, { useState } from 'react'

import {
  Box,
  Display,
  FontFamily,
  Heading6,
  Image,
  ModalProvider,
  Paragraph,
} from '@gousto-internal/citrus-react'
import classnames from 'classnames'

import Buttons from 'components/Product/Buttons'
import { Product } from 'routes/OrderConfirmation/types'

import { ProductBundleDetails } from '../ProductBundleDetails/ProductBundleDetails'

import css from './ProductBundle.css'

interface Props {
  product: {
    bundleImage: string
    bundleDescription: string
    bundleName: string
    bundlePrice: string
    bundleProducts: Product[]
  }
}

const ProductBundle = ({ product }: Props) => {
  const [modalToggle, setModalToggle] = useState<boolean>(false)
  const { bundleDescription, bundleImage, bundleName, bundlePrice, bundleProducts } = product

  const toggleModal = () => setModalToggle(!modalToggle)

  return (
    <ModalProvider>
      <section className={css.productWrapper}>
        <Box display={Display.Flex} className={css.bundleDetails}>
          <button
            type="button"
            className={classnames(css.resetButtonStyle, css.bundleImage)}
            onClick={toggleModal}
          >
            <Image src={bundleImage} alt={bundleName} />
          </button>
          <Box display={Display.Flex} className={css.bundleContent}>
            <Box className={css.bundleContentFirstColumn}>
              <button
                type="button"
                className={classnames(css.resetButtonStyle, css.bundleInfo)}
                onClick={toggleModal}
              >
                <Heading6 className="bundleTitle" size={3}>
                  {bundleName}
                </Heading6>
                <Paragraph className={css.bundleDescription}>{bundleDescription}</Paragraph>
              </button>
            </Box>
            {bundleProducts.map((p: Product) => (
              <h3 key={p.id} className={css.bundles}>
                {p.title}
              </h3>
            ))}
            <Box>
              <Box className={css.productButtonWrapper} role="button">
                <Heading6 fontFamily={FontFamily.Bold} size={1} className={css.bundlePrice}>
                  £{bundlePrice}
                </Heading6>
                <Buttons showPopUp fullWidth />
              </Box>
            </Box>
          </Box>
        </Box>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <ProductBundleDetails {...product} isOpen={modalToggle} />
      </section>
    </ModalProvider>
  )
}

export { ProductBundle }
