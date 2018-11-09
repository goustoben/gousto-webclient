module.exports = function () {
  this.plugin('done', function (stats) {
    process.exitCode = 0
    if (stats.compilation.errors && stats.compilation.errors.length) {
      console.log('================================')
      console.log('BUILD ERROR')
      console.log('================================')
      stats.compilation.errors.forEach(error => console.log(error))
      process.exitCode = 1
    }
  })
}
