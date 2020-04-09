export const onEnter = (callback) => (event) => (
  event.keyCode === 13 && callback(event)
)
