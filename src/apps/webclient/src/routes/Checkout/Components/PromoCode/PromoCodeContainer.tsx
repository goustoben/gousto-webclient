import React from 'react'

import actions from 'actions'
import { connect } from 'react-redux'

import { usePricing } from 'routes/Menu/domains/pricing'

import { PromoCode } from './PromoCode'

function mapStateToProps(state: any) {
  return {
    promoCode: state.basket.get('promoCode'),
    promoCodeApplied: state.basket.get('promoCodeApplied'),
    previewOrderId: state.basket.get('previewOrderId'),
    numPortions: state.basket.get('numPortions'),
    recipes: state.basket.get('recipes'),
  }
}

const PromoCodePure = (props: any) => {
  const { pricing } = usePricing()

  return <PromoCode {...props} promoCodeValid={pricing?.promoCodeValid} />
}

const mapDispatchToProps = {
  basketPromoCodeChange: actions.basketPromoCodeChange,
  basketPromoCodeAppliedChange: actions.basketPromoCodeAppliedChange,
  trackPromocodeChange: actions.trackPromocodeChange,
}

const PromoCodeContainer = connect(mapStateToProps, mapDispatchToProps)(PromoCodePure)

export { PromoCodeContainer }
