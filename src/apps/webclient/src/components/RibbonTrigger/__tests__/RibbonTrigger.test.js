import React from 'react'
import { mount } from 'enzyme'
import { RibbonTrigger } from '../RibbonTrigger'

describe('RibbonTrigger', () => {
  let wrapper
  const ribbon = jest.fn()
  ribbon.ribbonID = '123'

  const setRibbonTriggered = jest.fn()
  const isRibbonTriggered = false

  const mountRibbonTrigger = (props) =>
    mount(
      <RibbonTrigger
        setRibbonTriggered={setRibbonTriggered}
        isRibbonTriggered={isRibbonTriggered}
        shouldLimitToOncePerSession
        {...props}
      />,
    )

  beforeEach(() => {
    jest.clearAllMocks()
    global.ribbon = ribbon
  })

  describe('when mounted', () => {
    describe('when name is supplied', () => {
      beforeEach(() => {
        wrapper = mountRibbonTrigger({ name: 'control_welcome' })
      })

      test('then it should invoke the ribbon trigger and remember it', () => {
        expect(wrapper.children()).toHaveLength(0)
        expect(ribbon).toHaveBeenCalledWith('trigger', 'control_welcome')
        expect(setRibbonTriggered).toHaveBeenCalled()
      })
    })

    describe('when name is not supplied', () => {
      beforeEach(() => {
        wrapper = mountRibbonTrigger({ name: null })
      })

      test('then it should not invoke the trigger', () => {
        expect(ribbon).not.toHaveBeenCalled()
      })
    })

    describe('when ribbon is already triggered this session', () => {
      beforeEach(() => {
        wrapper = mountRibbonTrigger({ name: 'control_welcome', isRibbonTriggered: true })
      })

      test('then it should not invoke the trigger', () => {
        expect(ribbon).not.toHaveBeenCalled()
      })
    })

    describe('when it has probabilityPercentage', () => {
      const random = jest.fn()
      beforeEach(() => {
        Math.random = random
      })

      describe('and when the randomizer falls under it', () => {
        beforeEach(() => {
          random.mockReturnValue(0)
          wrapper = mountRibbonTrigger({
            name: 'control_welcome',
            isRibbonTriggered: false,
            probabilityPercentage: 50,
          })
        })

        test('then it should invoke the trigger', () => {
          expect(ribbon).toHaveBeenCalled()
        })
      })

      describe('and when the randomizer falls over it', () => {
        beforeEach(() => {
          random.mockReturnValue(0.55)
          wrapper = mountRibbonTrigger({
            name: 'control_welcome',
            isRibbonTriggered: false,
            probabilityPercentage: 50,
          })
        })

        test('then it should not invoke the trigger', () => {
          expect(ribbon).not.toHaveBeenCalled()
        })
      })
    })
  })

  describe('when ribbon is not defined', () => {
    beforeEach(() => {
      delete global.ribbon

      wrapper = mountRibbonTrigger({ name: 'control_welcome' })
    })

    test('then it should not invoke the trigger', () => {
      expect(ribbon).not.toHaveBeenCalled()
    })
  })
})
