import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'
import { propType } from 'graphql-anywhere'
import config from 'config/boxprices'
import Loading from 'Loading'
import Hero from 'Hero'
import { Heading } from 'goustouicomponents'
import { Subscription } from '../Home/Subscription'
import css from './BoxPrices.css'

import boxPriceQuery from './boxprices.gql'
import BoxPricesList from './BoxPricesList'
import BoxPricesContent from './BoxPricesContent'

class BoxPrices extends React.PureComponent {
  render() {
    const { isBoxPricesPageRedesignEnabled, data, basketNumPortionChange, goToStep } = this.props
    const { boxPrices, loading, error } = data
    const boxPricesRedesignProps = {
      basketNumPortionChange,
      goToStep,
      isBoxPricesPageRedesignEnabled
    }

    return (
      <div>
        <Helmet
          title="Gousto Prices | Try Our Food Box Delivery Now | Gousto"
          meta={[
            {
              name: 'description',
              content: 'Find prices on our 2 person or family size food boxes. Get free delivery on any day you like & subscribe for convenient fresh food. Order your first box now!',
            },
            {
              name: 'keywords',
              content: 'Gousto, recipe delivery, price, fresh, healthy food, cooking, recipe box',
            },
          ]}
        />
        {loading && <div className={css.loadingOverlay}><Loading /></div>}
        <div className={loading && css.loading}>
          {isBoxPricesPageRedesignEnabled
            ? (
              <div className={css.boxPriceTitle}>
                <Heading size="fontStyle4XL" isCenter>Recipe box prices</Heading>
                <p className={css.boxPriceSubTitle}>Choose a smaller or larger box depending on how many people you cook for.</p>
              </div>
            )
            : (
              <Hero
                style={{ backgroundPosition: '0 66%', backgroundSize: 'cover' }}
                imageUrl={config.hero.image}
                headerText={config.hero.header}
              />
            )}
          {!loading && <BoxPricesList boxPrices={boxPrices || []} type="gourmet" error={error} {...boxPricesRedesignProps} />}
          {isBoxPricesPageRedesignEnabled
            ? <Subscription header="How does Gousto work?" description="" isBoxPricesPageRedesignEnabled={isBoxPricesPageRedesignEnabled} />
            : <BoxPricesContent />}
        </div>
      </div>
    )
  }
}

BoxPrices.propTypes = {
  data: PropTypes.shape({
    ...propType(boxPriceQuery),
    loading: PropTypes.bool,
    error: PropTypes.object,
    boxPrices: PropTypes.object,
  }).isRequired,
  isBoxPricesPageRedesignEnabled: PropTypes.bool,
  basketNumPortionChange: PropTypes.func,
  goToStep: PropTypes.func
}

BoxPrices.defaultProps = {
  isBoxPricesPageRedesignEnabled: false,
  basketNumPortionChange: () => {},
  goToStep: () => {}
}

export { BoxPrices }
