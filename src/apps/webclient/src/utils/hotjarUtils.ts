export const invokeHotjarEvent = (name: string): void => {
  if (typeof window !== 'undefined' && window.hj) {
    window.hj('event', name)
  }
}
