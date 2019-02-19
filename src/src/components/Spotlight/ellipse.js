export const getEllipse = ({ originX, originY, radius, accuracy = 1 }) => {
  const n = 360 * accuracy,
    baseAngle = 2 * Math.PI / n

  let angle, x, y, steps = ''

  for(var i = 0; i <= n; i++) {
    angle = i * baseAngle
    x = Math.cos(angle).toFixed(3)
    y = Math.sin(angle).toFixed(3)

    steps += `${(originX + radius * x)}px ${(originY - radius * y)}px, `
  }

  return steps
}
