import { amountOfUsersByDistrict, districtByPostcode } from './usersByPostcode'

export const getDataForSocialBelonging = (postcode) => {
  const shortCode = postcode.slice(0, -3).trim()
  const district = districtByPostcode[postcode] || districtByPostcode[shortCode] || null
  const amountOfCustomers = amountOfUsersByDistrict[district] || null

  return {
    district,
    amountOfCustomers,
  }
}
