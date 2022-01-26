import React from 'react'
import { mount } from 'enzyme'
import { Section } from '../Section.logic'

describe('Section', () => {
  let wrapper
  const sectionTitle = 'Section title'
  beforeEach(() => {
    wrapper = mount(
      <Section title={sectionTitle}>
        <p>
          Section children
        </p>
      </Section>)
  })

  test('renders title', () => {
    expect(wrapper.find('.sectionTitle').text()).toBe(sectionTitle)
  })

  test('renders children', () => {
    expect(wrapper.find('p').text()).toEqual('Section children')
  })

  describe('when subtitle is passed as prop', () => {
    const sectionSubTitle = 'Section subtitle'
    beforeEach(() => {
      wrapper.setProps({subTitle: sectionSubTitle})
    })

    test('renders subTitle', () => {
      expect(wrapper.find('.sectionSubTitle').text()).toBe(sectionSubTitle)
    })
  })

  describe('when testingSelector is passed as prop', () => {
    beforeEach(() => {
      wrapper.setProps({testingSelector: 'your-details-section'})
    })

    test('adds data-testing', () => {
      expect(wrapper.find('[data-testing="your-details-section"]').exists()).toBeTruthy()
    })
  })
})
