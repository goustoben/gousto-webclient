function fourNumbersPropType(props, propName, componentName) {
  // eslint-disable-next-line react/destructuring-assignment
  const prop = props[propName]

  if (!Array.isArray(prop) || prop.length !== 4 || !prop.every(Number.isInteger)) {
    throw new Error(`<${componentName}> ${propName} needs to be an array of four numbers`)
  }

  return null
}

export { fourNumbersPropType }
