export const getUTMAndPromoCode = ({ tracking, basket, promoCurrent }) => ({
  UTM: tracking.get('utmSource'),
  promoCode: basket.get('promoCode') || promoCurrent
})
