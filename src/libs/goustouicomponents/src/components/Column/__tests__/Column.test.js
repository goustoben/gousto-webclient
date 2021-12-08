import React from 'react'
import { mount } from 'enzyme'
import { Column, columnSizes } from '../Column.logic'

describe('Column', () => {
  let wrapper
  const text = 'Hello'
  const screenSizes = ['Small', 'Medium', 'Large']
  beforeEach(() => {
    wrapper = mount(
      <Column smallScreen={2}>{text}</Column>,
    )
  })

  test('renders without crashing', () => {})

  test('renders children', () => {
    expect(wrapper.text()).toBe(text)
  })

  describe.each(screenSizes)('when %sScreen value is passed', (screenSize) => {
    describe.each(columnSizes)('and the value is %s ', (columnSize) => {
      beforeEach(() => {
        const props = {
          [`${screenSize.toLowerCase()}Screen`]: columnSize,
        }
        wrapper.setProps(props)
      })
      test(`adds the col${screenSize}${columnSize}`, () => {
        expect(
          wrapper.find(`.col${screenSize}${columnSize}`).exists(),
        ).toBeTruthy()
      })

      columnSizes.filter((columnS) => columnS !== columnSize)
        .forEach((columnS) => {
          test(`does not have the col${screenSize}${columnS}`, () => {
            expect(
              wrapper.find(`.col${screenSize}${columnS}`).exists(),
            ).toBeFalsy()
          })
        })
    })
    describe(`when padding for ${screenSize} Screen pased is true`, () => {
      beforeEach(() => {
        const props = {
          [`hasPadding${screenSize}Screen`]: true,
        }
        wrapper.setProps(props)
      })

      test(`adds the padding${screenSize}Screen`, () => {
        expect(
          wrapper.find(`.padding${screenSize}Screen`).exists(),
        ).toBeTruthy()
      })
    })

    describe(`when padding for ${screenSize} Screen pased is false`, () => {
      beforeEach(() => {
        const props = {
          [`hasPadding${screenSize}Screen`]: false,
        }
        wrapper.setProps(props)
      })

      test(`does not add the padding${screenSize}Screen`, () => {
        expect(
          wrapper.find(`.padding${screenSize}Screen`).exists(),
        ).toBeFalsy()
      })
    })
  })

  describe('when extraClasses is passed down', () => {
    const extraClass = 'testClass'
    beforeEach(() => {
      wrapper.setProps({
        extraClass,
      })
    })
    test('adds class extraClass to column', () => {
      expect(wrapper.find('.column').hasClass(extraClass)).toBeTruthy()
    })
  })
})
