// Only to be used for tests (Node.js) as nextTick is not part of the browsers API
const flushPromises = () => (
  new Promise(resolve => process.nextTick(resolve))
)

export {
  flushPromises,
}
