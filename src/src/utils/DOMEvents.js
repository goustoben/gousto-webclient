export function EscapeKeyPressed(e) {
  return e.type === 'keyup' && e.keyCode && e.keyCode === 27
}
