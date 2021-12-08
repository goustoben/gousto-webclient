import React from 'react'
import { mount } from 'enzyme'
import { ScrollCarousel, ScrollCarouselBody } from '..'

describe('<ScrollCarousel />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <ScrollCarousel>
        <div className="testHeader">test header</div>
        <ScrollCarouselBody>test content</ScrollCarouselBody>
        <div className="testFooter">test footer</div>
      </ScrollCarousel>,
    )
  })

  test('renders correctly', () => {
    expect(wrapper.find('.testHeader')).toHaveLength(1)

    expect(wrapper.find('.scrollable')).toHaveLength(1)
    expect(wrapper.find('.scrollable').prop('children')).toBe('test content')

    expect(wrapper.find('.testFooter')).toHaveLength(1)
  })
})
