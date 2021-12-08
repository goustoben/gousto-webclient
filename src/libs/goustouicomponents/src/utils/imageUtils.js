export const transformSrcSet = (media) => media.map(({ url, width }) => `${url} ${width}w`).join(', ')
