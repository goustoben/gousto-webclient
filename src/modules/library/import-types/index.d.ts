/**
 * Styles
 * ============================================================================
 */

declare module '*.scss' {
  const content: Record<string, string>
  // eslint-disable-next-line import/no-default-export
  // @ts-ignore [Duplicate of webclient]
  export default content
}

declare module '*.css' {
  const content: Record<string, string>
  // eslint-disable-next-line import/no-default-export
  // @ts-ignore [Duplicate of webclient]
  export default content
}

/**
 * Images
 * ============================================================================
 */

declare module '*.png' {
  const content: string
  // eslint-disable-next-line import/no-default-export
  // @ts-ignore [Duplicate of webclient]
  export default content
}

declare module '*.jpg' {
  const content: string
  // eslint-disable-next-line import/no-default-export
  // @ts-ignore [Duplicate of webclient]
  export default content
}
