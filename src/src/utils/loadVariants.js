import { loadContentVariants } from 'actions/content'

export const loadVariants = (variants, store) => {
	store.dispatch(loadContentVariants(variants))
}
