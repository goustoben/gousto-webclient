export function getColSizes(colSizes = {}) {
  return Object.keys(colSizes).reduce((accumulator, breakpoint) => ({
    ...accumulator,
    [`col-${breakpoint}-${colSizes[breakpoint]}`]: true,
  }), {})
}
