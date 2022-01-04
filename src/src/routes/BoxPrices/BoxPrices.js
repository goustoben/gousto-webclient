import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'
import { ReactReduxContext } from 'react-redux'
import { menuLoadBoxPrices } from 'actions/menu'
import { getHeroDetails, seo } from 'routes/BoxPrices/boxPricesConfig'
import Loading from 'Loading'
import { Hero } from 'Hero'
import { BoxDescriptorsPropType } from './boxPricesPropTypes'
import css from './BoxPrices.css'

import { BoxPricesRedesign } from './BoxPricesRedesign'
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
    const {
      isBoxPricesRedesignEnabled,
      boxPricesBoxSizeSelected,
      numPersonsToBoxDescriptors,
      loading,
      error,
      trackUTMAndPromoCode,
    } = this.props
    const { image, header } = getHeroDetails()

    return isBoxPricesRedesignEnabled ? (
      <div>
        <Helmet title={seo.title} meta={seo.meta} />
        <BoxPricesRedesign
          error={error}
          loading={loading}
          boxPricesBoxSizeSelected={boxPricesBoxSizeSelected}
          numPersonsToBoxDescriptors={numPersonsToBoxDescriptors}
          trackUTMAndPromoCode={trackUTMAndPromoCode}
        />
      </div>
    ) : (
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
            imageUrl={image}
            headerText={header}
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
  isBoxPricesRedesignEnabled: PropTypes.bool,
  boxPricesBoxSizeSelected: PropTypes.func,
  numPersonsToBoxDescriptors: PropTypes.objectOf(BoxDescriptorsPropType),
  trackUTMAndPromoCode: PropTypes.func,
}

BoxPrices.defaultProps = {
  loading: false,
  error: null,
  isBoxPricesRedesignEnabled: false,
  boxPricesBoxSizeSelected: () => {},
  numPersonsToBoxDescriptors: null,
  trackUTMAndPromoCode: () => {},
}

BoxPrices.contextType = ReactReduxContext

export { BoxPrices }
