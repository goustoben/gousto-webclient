export const transformIngredientImgSrcSet = (urls = []) => urls.map(({ src, width }) => `${src} ${width}w`).join(', ')
