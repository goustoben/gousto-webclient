export const shouldScroll = (prevRouterProps, { location }) => (
  prevRouterProps && location.pathname !== prevRouterProps.location.pathname // don't scroll on query string change
)
