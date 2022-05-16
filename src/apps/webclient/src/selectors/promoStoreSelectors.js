import { createSelector } from 'reselect'

export const getPromoStore = (state) => state.promoStore

export const createGetPromoStoreEntry = (promoCode) =>
  createSelector(getPromoStore, (promoStore) => promoStore.get(promoCode))
