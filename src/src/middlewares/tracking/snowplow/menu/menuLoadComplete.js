export const menuLoadComplete = (action) => ({
  type: action.type,
  data: {
    timeToLoadMs: action.timeToLoadMs,
    useMenuService: action.useMenuService
  }
})
