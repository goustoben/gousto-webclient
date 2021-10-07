function clickAndThrowOnFailure(selector, callback) {
  this.click(selector, result => {
    if (result.status !== 0) {
      throw new Error(`Nightwatch click() returned non-zero status. Result: ${JSON.stringify(result)}`)
    }

    callback && callback(result)
  })

  return this
}

exports.command = clickAndThrowOnFailure
