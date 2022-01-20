module.exports = (name) => {
  const [match = name] = name.match(/src\/\S+/) || []

  return match
}
