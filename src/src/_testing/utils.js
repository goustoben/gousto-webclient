// Only to be used for tests (Node.js) as nextTick is not part of the browsers API
const flushPromises = () => (Promise.resolve())

export {
  flushPromises,
}
