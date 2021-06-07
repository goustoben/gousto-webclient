import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'
import { propType } from 'graphql-anywhere'
import { hero, seo } from 'config/boxprices'
import Loading from 'Loading'
import Hero from 'Hero'
import css from './BoxPrices.css'

import boxPriceQuery from './boxprices.gql'
import { BoxPricesList } from './BoxPricesList'
import { BoxPricesContent } from './BoxPricesContent'

class BoxPrices extends React.PureComponent {
  render() {
    const { data, boxPricesBoxSizeSelected } = this.props
    const { boxPrices, loading, error } = data

    return (
      <div>
        <Helmet title={seo.title} meta={seo.meta} />
        {loading && (
          <div className={css.loadingOverlay}>
            <Loading />
          </div>
        )}
        <div className={loading ? css.loading : ''}>
          <Hero
            style={{ backgroundPosition: '0 66%', backgroundSize: 'cover' }}
            imageUrl={hero.image}
            headerText={hero.header}
          />
          {!loading && (
            <BoxPricesList
              boxPrices={boxPrices || []}
              type="gourmet"
              error={error}
              boxPricesBoxSizeSelected={boxPricesBoxSizeSelected}
            />
          )}
          <BoxPricesContent />
        </div>
      </div>
    )
  }
}

BoxPrices.propTypes = {
  data: PropTypes.shape({
    ...propType(boxPriceQuery),
    loading: PropTypes.bool,
    error: PropTypes.string,
    boxPrices: PropTypes.arrayOf(PropTypes.object)
  }),
  boxPricesBoxSizeSelected: PropTypes.func,
}

BoxPrices.defaultProps = {
  data: {},
  boxPricesBoxSizeSelected: () => {},
}

export { BoxPrices }
