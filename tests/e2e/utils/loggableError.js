const loggableError = function (err, replacer = null, space = "\n") {
  const loggableError = Object.getOwnPropertyNames(err).reduce(
    (_loggableError, currentProperty) => ({
      ..._loggableError,
      [currentProperty]: err[currentProperty],
    }),
    {}
  );

  return JSON.stringify(loggableError, replacer, space);
};

module.exports = { loggableError };
