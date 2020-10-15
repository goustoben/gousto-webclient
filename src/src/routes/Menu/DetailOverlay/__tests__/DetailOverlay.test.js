import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'

import Modal from 'Modal'
import { DetailContainer } from 'routes/Menu/Recipe/Detail'
import { DetailOverlay } from 'routes/Menu/DetailOverlay/DetailOverlay'

jest.mock('routes/Menu/Recipe/Detail')

describe('DetailOverlay file', () => {
  let onCloseOverlaySpy

  describe('DetailOverlay', () => {
    let wrapper
    let stock
    let recipesStore

    beforeAll(() => {
      onCloseOverlaySpy = jest.fn()
    })

    beforeEach(() => {
      stock = Immutable.fromJS({
        1: {2: 2},
        2: {2: 2},
        3: {2: 2},
      })

      recipesStore = Immutable.fromJS({
        1: {
          id: '1',
          availability: [],
          boxType: 'vegetarian',
          dietType: 'Fish',
        },
        2: {
          id: '2',
          availability: [],
          boxType: 'vegetarian',
          dietType: 'Vegetarian',
        },
        3: {id: '3', availability: [], boxType: 'gourmet', dietType: 'Meat'},
      })
      wrapper = shallow(
        <DetailOverlay
          showOverlay
          menuRecipeDetailShow="1"
          recipesStore={recipesStore}
          numPortions={2}
          stock={stock}
          isOutOfStock={false}
          onCloseOverlay={onCloseOverlaySpy}
        />
      )

      DetailContainer.mockReturnValue(<div />)
    })

    afterEach(() => {
      wrapper.unmount()
    })

    test('should render 1 Overlay', () => {
      expect(wrapper.find(Modal).length).toBe(1)
    })

    test('should render 1 Detail component', () => {
      expect(wrapper.find(DetailContainer).length).toBe(1)
    })
  })

  describe('recipe detail overlay', () => {
    let wrapper

    beforeAll(() => {
      onCloseOverlaySpy = jest.fn()
      wrapper = shallow(
        <DetailOverlay
          showOverlay={false}
          menuRecipeDetailShow="3231"
          recipesStore={Immutable.Map({})}
          numPortions={2}
          stock={Immutable.Map({})}
          isOutOfStock={false}
          onCloseOverlay={onCloseOverlaySpy}
        />
      )
    })

    afterAll(() => {
      wrapper.unmount()
    })

    test('should be closed if showOverlay flag is false', () => {
      expect(wrapper.find(Modal).exists()).toBe(false)
    })
  })

  describe('Escape key press tests', () => {
    let removeEventListenerSpy
    let addEventListenerSpy

    afterEach(() => {
      jest.clearAllMocks()
    })

    beforeEach(() => {
      removeEventListenerSpy = jest.spyOn(global.window.document, 'removeEventListener')
      addEventListenerSpy = jest.spyOn(global.window.document, 'addEventListener')
    })

    describe('when showOverlay is false', () => {
      let wrapper

      beforeAll(() => {
        onCloseOverlaySpy = jest.fn()
        wrapper = shallow(
          <DetailOverlay
            showOverlay={false}
            menuRecipeDetailShow="3231"
            recipesStore={Immutable.Map({})}
            numPortions={2}
            stock={Immutable.Map({})}
            isOutOfStock={false}
            onCloseOverlay={onCloseOverlaySpy}
          />
        )
      })

      afterAll(() => {
        wrapper.unmount()
        expect(removeEventListenerSpy).toHaveBeenCalled()
      })

      it('should call addEventListener if showOverlay is set to true', () => {
        wrapper.setProps({ showOverlay: true })
        expect(addEventListenerSpy).toHaveBeenCalled()
      })

      it('should not call addEventListener if showOverlay is set to true again (already defined)', () => {
        wrapper.setProps({ showOverlay: true })
        expect(removeEventListenerSpy).not.toHaveBeenCalled()
        expect(addEventListenerSpy).not.toHaveBeenCalled()
      })

      it('should call removeEventListener if showOverlay is set to false', () => {
        wrapper.setProps({ showOverlay: false })
        expect(removeEventListenerSpy).toHaveBeenCalled()
        expect(addEventListenerSpy).not.toHaveBeenCalled()
      })

      it('should not call removeEventListener if showOverlay is set to false (already defined)', () => {
        wrapper.setProps({ showOverlay: false })
        expect(removeEventListenerSpy).not.toHaveBeenCalled()
        expect(addEventListenerSpy).not.toHaveBeenCalled()
      })

      describe('when Escape key is pressed', () => {
        it('should not call onCloseOverlay', () => {
          // eslint-disable-next-line no-undef
          const event = new KeyboardEvent('keyup', { keyCode: 27, type: 'keyup' })
          window.document.dispatchEvent(event)
          expect(onCloseOverlaySpy).not.toHaveBeenCalled()
        })
      })
    })

    describe('when showOverlay is true', () => {
      let wrapper

      beforeAll(() => {
        onCloseOverlaySpy = jest.fn()
        wrapper = shallow(
          <DetailOverlay
            showOverlay
            menuRecipeDetailShow="3231"
            recipesStore={Immutable.Map({})}
            numPortions={2}
            stock={Immutable.Map({})}
            isOutOfStock={false}
            onCloseOverlay={onCloseOverlaySpy}
          />
        )
      })

      afterAll(() => {
        wrapper.unmount()
        expect(removeEventListenerSpy).toHaveBeenCalled()
      })

      it('should only call once addEventListener after changing props', () => {
        wrapper.setProps({ showOverlay: true })
        expect(addEventListenerSpy).toHaveBeenCalledTimes(1)
      })

      describe('when Escape key is pressed', () => {
        it('should call onCloseOverlay', () => {
          // eslint-disable-next-line no-undef
          const event = new KeyboardEvent('keyup', { keyCode: 27, type: 'keyup' })
          window.document.dispatchEvent(event)
          expect(onCloseOverlaySpy).toHaveBeenCalled()
        })
      })

      it('should call removeEventListener if showOverlay is set to false', () => {
        wrapper.setProps({ showOverlay: false })
        expect(removeEventListenerSpy).toHaveBeenCalled()
        expect(addEventListenerSpy).not.toHaveBeenCalled()
      })
    })
  })
})
