// used for allowing the use of aliases (styles/file.module.css) from any part of the project
// needs to be manually declared
// this file is imported in webpack as well to help resolve the depdendencies of CSS files imported from Zest

const path = require('path')

module.exports = (baseURL, sourceURL, isUsingModuleNaming) => {
  const moduleNaming = isUsingModuleNaming ? '.module' : ''

  return {
    [`${sourceURL}design-language/breakpoints${moduleNaming}.css`]: path.resolve(baseURL, './src/design-language/breakpoints.module.css'),
    [`${sourceURL}design-language/typography${moduleNaming}.css`]: path.resolve(baseURL, './src/design-language/typography.module.css'),
    [`${sourceURL}design-language/general-setup${moduleNaming}.css`]: path.resolve(baseURL, './src/design-language/general-setup.module.css'),
    [`${sourceURL}design-language/anchor${moduleNaming}.css`]: path.resolve(baseURL, './src/design-language/anchor.module.css'),
    [`${sourceURL}design-language/utils${moduleNaming}.css`]: path.resolve(baseURL, './src/design-language/utils.module.css'),
    [`${sourceURL}design-language/icons`]: path.resolve(baseURL, './src/design-language/icons'),
    [`${sourceURL}design-language/media`]: path.resolve(baseURL, './src/design-language/media'),
    [`${sourceURL}gousto-config`]: path.resolve(baseURL, './src/gousto-config'),
    [`${sourceURL}styles/borders${moduleNaming}.css`]: path.resolve(baseURL, './src/styles/borders.module.css'),
    [`${sourceURL}styles/buttons${moduleNaming}.css`]: path.resolve(baseURL, './src/styles/buttons.module.css'),
    [`${sourceURL}styles/colors${moduleNaming}.css`]: path.resolve(baseURL, './src/styles/colors.module.css'),
    [`${sourceURL}styles/display${moduleNaming}.css`]: path.resolve(baseURL, './src/styles/display.module.css'),
    [`${sourceURL}styles/flex${moduleNaming}.css`]: path.resolve(baseURL, './src/styles/flex.module.css'),
    [`${sourceURL}styles/fonts`]: path.resolve(baseURL, './src/styles/fonts'),
    [`${sourceURL}styles/screenSizes${moduleNaming}.css`]: path.resolve(baseURL, './src/styles/screenSizes.module.css'),
    [`${sourceURL}styles/shadows${moduleNaming}.css`]: path.resolve(baseURL, './src/styles/shadows.module.css'),
    [`${sourceURL}styles/spacing${moduleNaming}.css`]: path.resolve(baseURL, './src/styles/spacing.module.css'),
    [`${sourceURL}styles/typography${moduleNaming}.css`]: path.resolve(baseURL, './src/styles/typography.module.css'),
    [`${sourceURL}styles/z-index${moduleNaming}.css`]: path.resolve(baseURL, './src/styles/z-index.module.css'),
    [`${sourceURL}styles/effects${moduleNaming}.css`]: path.resolve(baseURL, './src/styles/effects.module.css'),
    [`${sourceURL}styles/vendor/font-awesome-module${moduleNaming}.css`]: path.resolve(baseURL, './src/styles/vendor/font-awesome-module.module.css'),
  }
}
