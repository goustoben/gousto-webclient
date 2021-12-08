import React from 'react'
import { mount } from 'enzyme'

import { NarrowCard, NarrowCardTitle, NarrowCardContent } from '..'

describe('<NarrowCard />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <NarrowCard>
        A child
      </NarrowCard>,
    )
  })

  describe('render', () => {
    test('component does not crash', () => {
      expect(wrapper.find('div').length).toBeGreaterThan(0)
    })

    test('title is rendered', () => {
      const title = 'A title'
      wrapper.setProps({
        children:
  <NarrowCardTitle>
    {title}
  </NarrowCardTitle>,
      })

      expect(wrapper.text()).toBe(title)
    })

    test('title image is rendered', () => {
      const srcImage = 'image/path.jpg'
      wrapper.setProps({
        children:
        (
          <NarrowCardTitle imageSrc={srcImage}>
            A child
          </NarrowCardTitle>
        ),
      })

      expect(wrapper.find('img').prop('src')).toBe('image/path.jpg')
    })

    test('content is rendered', () => {
      const content = 'My content'
      wrapper.setProps({
        children:
  <NarrowCardContent>
    {content}
  </NarrowCardContent>,
      })

      expect(wrapper.text()).toBe(content)
    })
  })
})
