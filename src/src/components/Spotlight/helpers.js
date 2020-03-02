export const getDocumentHeight = () => {
  const { body, documentElement } = document

  return Math.max(
    body.scrollHeight,
    body.offsetHeight,
    documentElement.clientHeight,
    documentElement.scrollHeight,
    documentElement.offsetHeight,
  )
}

export const getEllipse = ({ originX, originY, radius, accuracy = 1 }) => {
  const n = 360 * accuracy
  const baseAngle = 2 * Math.PI / n

  let steps = ''

  for (let i = 0; i <= n; i++) {
    const angle = i * baseAngle
    const x = Math.cos(angle).toFixed(3)
    const y = Math.sin(angle).toFixed(3)

    steps += `${(originX + radius * x)}px ${(originY - radius * y)}px, `
  }

  return steps
}
