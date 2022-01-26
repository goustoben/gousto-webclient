export const transformIngredientImgSrcSet = (urls = []) => urls.map(({ url, width }) => `${url} ${width}w`).join(', ')
