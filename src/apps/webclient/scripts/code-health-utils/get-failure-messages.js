/**
 * Coverage works like this:
 * - new files start at 85% line coverage target
 * - old files with bad coverage can't get any worse
 * - old files with OK coverage can regress up to 5%, but only down to 50%
 */
function getTargetCoverage(previousCoverage) {
  const startingTarget = 85
  const lowerBound = 50
  const acceptedRegression = 5

  if (!previousCoverage) {
    return startingTarget
  } else if (previousCoverage < lowerBound) {
    return previousCoverage
  } else {
    return Math.max(previousCoverage - acceptedRegression, lowerBound)
  }
}

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

  if (filePath.match(/\.d\.ts$/)) {
    return null
  }

  const previousCoverage = (!benchmark || benchmark.coveragePercent === null) ? 0 : benchmark.coveragePercent
  const targetThreshold = getTargetCoverage(previousCoverage)

  if (compare.coveragePercent >= targetThreshold) {
    return null
  }

  return `[test coverage] ${compare.coveragePercent.toFixed(2)}% covered (min ${targetThreshold.toFixed(2)}%, current ${previousCoverage.toFixed(2)}%)`
}

const getFailureMessages = (benchmark, compare, filePath) => [
  getLintErrorFailureMessage(benchmark, compare),
  getLintWarningFailureMessage(benchmark, compare),
  getCoverageFailureMessage(benchmark, compare, filePath)
].filter(failure => failure !== null)

module.exports = getFailureMessages
