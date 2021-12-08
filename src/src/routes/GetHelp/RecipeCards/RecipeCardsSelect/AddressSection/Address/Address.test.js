import React from 'react'
import { mount } from 'enzyme'
import { Address } from './Address'

describe('The Address component', () => {
  const LINE1 = '125 Upper Richmond Road'
  const LINE2 = 'Putney'
  const LINE3 = 'the best borough'
  const NAME = 'My Home'
  const POSTCODE = 'W3 7UP'
  const TOWN = 'London'

  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <Address
        line1={LINE1}
        line2=""
        line3=""
        name={NAME}
        postcode={POSTCODE}
        town={TOWN}
      />
    )
  })

  test('renders the name of the address in a bold paragraph', () => {
    expect(wrapper.find('p.name').text()).toBe(NAME)
  })

  test('renders the address in a paragraph below the name', () => {
    expect(wrapper.find('.address').text())
      .toBe(`${LINE1}, ${TOWN}, ${POSTCODE}`)
  })

  describe('when optional lines are not empty', () => {
    beforeEach(() => {
      wrapper.setProps({ line2: LINE2, line3: LINE3 })
    })

    test('renders the optional lines too', () => {
      expect(wrapper.find('.address').text())
        .toBe(`${LINE1}, ${LINE2}, ${LINE3}, ${TOWN}, ${POSTCODE}`)
    })
  })
})
