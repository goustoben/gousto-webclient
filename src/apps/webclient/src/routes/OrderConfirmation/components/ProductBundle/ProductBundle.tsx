import { Box, Display, FontFamily, Heading6, Image, Paragraph } from '@gousto-internal/citrus-react'
import classnames from 'classnames'
import Overlay from 'Overlay'
import Buttons from 'Product/Buttons'
import React, { FC } from 'react'
import { Product } from 'routes/OrderConfirmation/types'
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

const ProductBundle: FC<Props> = ({ product }) => {
  const { bundleDescription, bundleImage, bundleName, bundlePrice, bundleProducts } = product

  return (
    <section className={css.productWrapper}>
      <Box display={Display.Flex} className={css.bundleDetails}>
        <button type="button" className={classnames(css.resetButtonStyle, css.bundleImage)}>
          <Image src={bundleImage} alt={bundleName} />
        </button>
        <Box display={Display.Flex} className={css.bundleContent}>
          <Box className={css.bundleContentFirstColumn}>
            <button type="button" className={classnames(css.resetButtonStyle, css.bundleInfo)}>
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
      <Overlay open={false}>
        <h1>Modal</h1>
      </Overlay>
    </section>
  )
}

export { ProductBundle }
