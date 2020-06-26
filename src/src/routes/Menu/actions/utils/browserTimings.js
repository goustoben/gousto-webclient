export const getTimeSinceRequestStart = () => Date.now() - window.performance.timing.requestStart

export const getTimeToFirstByte = () => (window.performance.timing.responseStart - window.performance.timing.fetchStart)
