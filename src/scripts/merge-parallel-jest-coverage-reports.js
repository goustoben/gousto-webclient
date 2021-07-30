/* eslint-disable */
const fs = require('fs')
const path = require('path')

;(() => {
  // Require all reports
  const allFiles = fs.readdirSync(process.cwd())
  const allReports = allFiles.filter((file) => {
    return path.extname(file).toLowerCase() === '.json' && file.includes('coverage-summary')
  })

  console.log('all report files:', JSON.stringify(allReports))

  const [firstReport, ...restReports] = allReports.map((filename) => require(filename))

  // Iterate over all keys
  const mergedReport = Object.entries(firstReport).reduce((_merged, [path, file], idx) => {
    // Pick the report result with the highest coverage
    if (path === 'total') {
      return {
        ...merged,
        [path]: file,
      }
    }

    // Get report values from all reports for this idx
    const reportValuesForIdx = restReports.reduce((vals, currentReport) => {
      return [...vals, Object.values(currentReport)[idx]]
    }, [])
  }, {})

  // Write file
})()
