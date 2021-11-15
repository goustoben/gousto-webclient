import config from "config/products"

export const reqData = {
    image_sizes: config.fetchImageSizes,
    includes: config.fetchIncludes,
}
