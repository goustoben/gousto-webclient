import { loadContentVariants } from "actions/content/loadContentVariants"

export const loadVariants = (variants, store) => {
  store.dispatch(loadContentVariants(variants))
}
