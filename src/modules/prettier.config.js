module.exports = {
  printWidth: 100,
  semi: false,
  trailingComma: 'all',
  singleQuote: true,
  tabWidth: 2,
  importOrder: [
    // react always at top
    '^react$',

    // everything not caught by another group
    '<THIRD_PARTY_MODULES>',

    // libraries
    '^library/.+$',

    // aliases from tsconfig (except media)
    '^(actions|apis|components|config|containers|fixtures|hooks|layouts|reducers|routes|selectors|utils)/.+$',

    // media aliased files
    '^media/.+$',

    /* any ./ or ../ relative import that doesnt end in .css */
    '^[./].+(?<!.css)$',

    // design-language imports
    '^(design-language)/.+$',

    // any .css import
    '^.+\\.css$'
  ],
  importOrderSeparation: true
}
