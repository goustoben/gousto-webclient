import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'
import { menuLoadBoxPrices } from 'actions/menu'
import { hero, seo } from 'routes/BoxPrices/boxPricesConfig'
import Loading from 'Loading'
import Hero from 'Hero'
import { BoxDescriptorsPropType } from './boxPricesPropTypes'
import css from './BoxPrices.css'

import { BoxPricesList } from './BoxPricesList'
import { BoxPricesContent } from './BoxPricesContent'

class BoxPrices extends React.PureComponent {
  static fetchData = async ({ store }) => {
    await store.dispatch(menuLoadBoxPrices())
  }

  componentDidMount() {
    const { store } = this.context
    BoxPrices.fetchData({ store })
  }

  render() {
    const { boxPricesBoxSizeSelected, numPersonsToBoxDescriptors, loading, error } = this.props

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
              numPersonsToBoxDescriptors={numPersonsToBoxDescriptors}
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
  loading: PropTypes.bool,
  error: PropTypes.string,
  boxPricesBoxSizeSelected: PropTypes.func,
  numPersonsToBoxDescriptors: PropTypes.objectOf(BoxDescriptorsPropType),
}

BoxPrices.defaultProps = {
  loading: false,
  error: null,
  boxPricesBoxSizeSelected: () => {},
  numPersonsToBoxDescriptors: null,
}

BoxPrices.contextTypes = {
  store: PropTypes.shape({
    dispatch: PropTypes.func,
  }).isRequired,
}

export { BoxPrices }
