import React from 'react'
import { shallow } from 'enzyme'
import { EscapeKeyPressed } from '../DOMEvents'

describe('DOMEvents file', () => {
  describe('EscapeKeyPressed function', () => {
    let callbackMock

    beforeEach(() => {
      jest.clearAllMocks()
      callbackMock = jest.fn()
    })

    it('should trigger mock if Escape key is pressed', () => {
      const onKeyUp = (e) => (EscapeKeyPressed(e) ? callbackMock() : null)

      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      const element = shallow((<div onKeyUp={onKeyUp} />))
      element.find('div').simulate('keyup', { keyCode: 27, type: 'keyup' })
      expect(callbackMock).toHaveBeenCalled()
    })

    it('should not trigger mock is Escape key is not pressed', () => {
      const onKeyUp = (e) => (EscapeKeyPressed(e) ? callbackMock() : null)

      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      const element = shallow((<div onKeyUp={onKeyUp} />))
      element.find('div').simulate('keyup', { keyCode: 65, type: 'keyup' })
      expect(callbackMock).not.toHaveBeenCalled()
    })
  })
})
