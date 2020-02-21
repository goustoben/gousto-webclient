import { activeMenuForDateTransformer } from './activeMenuForDate'

describe('activeMenuForDateTransformer', () => {
  test('should get the active menu for a date that is before the first menus end_at', () => {
    const testData = {
      data: [{
        id: '295',
        type: 'menus',
        attributes: {
          ends_at: '2019-04-03T11:59:59+01:00'
        }
      }, {
        id: '296',
        type: 'menus',
        attributes: {
          ends_at: '2019-10-20T11:59:59+01:00'
        }
      }]
    }
    const result = activeMenuForDateTransformer(testData, '2019-04-01T11:59:59+01:00')
    expect(result).toEqual({
      id: '295',
      type: 'menus',
      attributes: {
        ends_at: '2019-04-03T11:59:59+01:00'
      }
    })
  })

  test('should get the active menu for a date that is after the first menus end_at', () => {
    const testData = {
      data: [{
        id: '295',
        type: 'menus',
        attributes: {
          ends_at: '2019-04-03T11:59:59+01:00'
        }
      }, {
        id: '296',
        type: 'menus',
        attributes: {
          ends_at: '2019-10-20T11:59:59+01:00'
        }
      }]
    }
    const result = activeMenuForDateTransformer(testData, '2019-06-13T11:59:59+01:00')
    expect(result).toEqual({
      id: '296',
      type: 'menus',
      attributes: {
        ends_at: '2019-10-20T11:59:59+01:00'
      }
    })
  })

  test('should get the active menu for a date that is just after the first menus end_at', () => {
    const testData = {
      data: [{
        id: '295',
        type: 'menus',
        attributes: {
          ends_at: '2019-04-03T11:59:59+01:00'
        }
      }, {
        id: '296',
        type: 'menus',
        attributes: {
          ends_at: '2019-10-20T11:59:59+01:00'
        }
      }]
    }
    const result = activeMenuForDateTransformer(testData, '2019-04-03T12:00:00+01:000')
    expect(result).toEqual({
      id: '296',
      type: 'menus',
      attributes: {
        ends_at: '2019-10-20T11:59:59+01:00'
      }
    })
  })

  test('should get the first menu if no date is passed in', () => {
    const testData = {
      data: [{
        id: '295',
        type: 'menus',
        attributes: {
          ends_at: '2019-04-03T11:59:59+01:00'
        }
      }, {
        id: '296',
        type: 'menus',
        attributes: {
          ends_at: '2019-10-20T11:59:59+01:00'
        }
      }]
    }
    const result = activeMenuForDateTransformer(testData, null)
    expect(result).toEqual({
      id: '295',
      type: 'menus',
      attributes: {
        ends_at: '2019-04-03T11:59:59+01:00'
      }
    })
  })

  test('should return undefined for a date that is just after the second menus end_at', () => {
    const testData = {
      data: [{
        id: '295',
        type: 'menus',
        attributes: {
          ends_at: '2019-04-03T11:59:59+01:00'
        }
      }, {
        id: '296',
        type: 'menus',
        attributes: {
          ends_at: '2019-10-20T11:59:59+01:00'
        }
      }]
    }
    const result = activeMenuForDateTransformer(testData, '2019-10-25T12:00:00+01:000')
    expect(result).toEqual(undefined)
  })

  describe('when a menu is being previewed', () => {
    test('then it should return the only menu in the response ', () => {
      const testData = {
        meta: {
          isPreviewMenu: true,
        },
        data: [{
          id: '999',
          type: 'menus',
          attributes: {
            ends_at: '2100-04-03T11:59:59+01:00'
          }
        }]
      }
      const result = activeMenuForDateTransformer(testData, '2019-10-25T12:00:00+01:000')
      expect(result.id).toEqual('999')
    })
  })
})
