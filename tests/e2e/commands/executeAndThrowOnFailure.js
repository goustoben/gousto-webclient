function executeAndThrowOnFailure(body, args = [], callback) {
  this.execute(body, args, result => {
    if (result.status !== 0) {
      throw new Error(`Nightwatch execute() returned non-zero status. Result: ${JSON.stringify(result)}`)
    }

    callback && callback(result)
  })

  return this
}

exports.command = executeAndThrowOnFailure
