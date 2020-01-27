import regExp from 'validations/regularExpressions'

describe('validations/regularExpressions', () => {
  const regex = regExp.name

  test('should pass validation', () => {
    expect(regex.test('gfgf ghgh ń gñç')).toEqual(true)
    expect(regex.test('gfĦû ģ gf ghgłò ń g')).toEqual(true)
    expect(regex.test('éèçàăâî ßäöüä żóą')).toEqual(true)
    expect(regex.test('saa-sasa')).toEqual(true)
    expect(regex.test('saa\'sasa')).toEqual(true)
    expect(regex.test('saa‘sasa')).toEqual(true)
    expect(regex.test('sa-a sa\'sa')).toEqual(true)
    expect(regex.test('Da\'vi d\'a')).toEqual(true)
    expect(regex.test('Da‘vi d‘a')).toEqual(true)
    expect(regex.test(' Da\'vi d\'a ')).toEqual(true)
    expect(regex.test(' Da‘vi d‘a')).toEqual(true)
  })

  test('should not pass validation', () => {
    expect(regex.test('gQ££@^£%   ')).toEqual(false)
    expect(regex.test('gQ:">,;i ')).toEqual(false)
    expect(regex.test('[]{}')).toEqual(false)
    expect(regex.test('')).toEqual(false)
    expect(regex.test('gfgf ghgh234234234 ń g    ')).toEqual(false)
  })
})
