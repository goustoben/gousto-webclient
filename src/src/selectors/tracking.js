export const getUTMAndPromoCode = ({ tracking, basket }) => ({
  UTM: tracking.get('utmSource'),
  promoCode: basket.get('promoCode')
})
