/* eslint-disable */
const REGRESSION_THRESHOLD = 5;

const getLintErrorFailureMessage = (benchmark, compare) => {
  // file not linted, skip
  if (compare.errorCount === null) {
    return null
  }

  // file has no errors, pass
  if (compare.errorCount === 0) {
    return null
  }

  return `[lint errors] ${compare.errorCount} errors (max 0)`
}

const getLintWarningFailureMessage = (benchmark, compare) => {
  // file not linted, skip
  if (compare.warningCount === null) {
    return null
  }

  // set threshold at 0 if we can't get an appropriate benchmark
  const threshold =
    (!benchmark || benchmark.warningCount === null)
    ? 0
    : benchmark.warningCount

  if (
    compare.warningCount === 0
    || compare.warningCount <= threshold
  ) {
    return null
  }

  return `[lint warnings] ${compare.warningCount} warnings (max ${threshold})`
}

const getCoverageFailureMessage = (benchmark, compare, filePath) => {
  // file has no test coverage, skip
  if (compare.coveragePercent === null) {
    return null
  }

  // it doesn't make sense to unit-test the regression tests and their
  // utilities
  if (filePath.includes('__regression__')) {
    return null
  }

  const currentCoverage = (!benchmark || benchmark.coveragePercent === null) ? 0: benchmark.coveragePercent

  // set threshold at 100 if we can't get an appropriate benchmark
  const targetThreshold = (currentCoverage === 0) 
    ? 100 
    : (currentCoverage > REGRESSION_THRESHOLD) 
      ? currentCoverage - REGRESSION_THRESHOLD 
      : 0

  if (
    compare.coveragePercent === 100
    || compare.coveragePercent >= targetThreshold
  ) {
    return null
  }
 
  return `[test coverage] ${compare.coveragePercent.toFixed(2)}% covered (min ${targetThreshold.toFixed(2)}%, current ${currentCoverage.toFixed(2)}%)`
}

const getFailureMessages = (benchmark, compare, filePath) => {
  return [
    getLintErrorFailureMessage(benchmark, compare),
    getLintWarningFailureMessage(benchmark, compare),
    getCoverageFailureMessage(benchmark, compare, filePath)
  ].filter(failure => failure !== null)
}

module.exports = getFailureMessages
