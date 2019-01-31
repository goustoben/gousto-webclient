export const getEllipse = ({ originX, originY, radius }) => {
  const n = 360,
    baseAngle = 2 * Math.PI / n

  let angle, x, y, steps = ''

  for(var i = 0; i <= n; i++) {
    angle = i * baseAngle
    x = Math.cos(angle)
    y = Math.sin(angle)

    steps += `${(originX + radius * x)}px ${(originY - radius * y)}px, `
  }

  return steps
}
