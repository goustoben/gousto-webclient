import React from 'react'
import { CTA } from 'routes/Home/CTA'
import { shallow, mount } from 'enzyme'
import { Button, Segment } from 'goustouicomponents'

describe('CTA', () => {
  let wrapper
  let homeGetStarted
  let width
  const ctaUri = '/ctaTest'
  const sectionForTracking = 'testSection'

  beforeEach(() => {
    homeGetStarted = jest.fn()
    width = 100
    wrapper = shallow(
      <CTA
        homeGetStarted={homeGetStarted}
        ctaUri={ctaUri}
        sectionForTracking={sectionForTracking}
        width={width}
      >
        click here
      </CTA>,
    )
  })

  test('should render a Button and a Segment', () => {
    expect(wrapper.find(Button).length).toEqual(1)
    expect(wrapper.find(Segment).length).toEqual(1)
  })

  test('should put the text into the button', () => {
    expect(
      wrapper
        .find(Segment)
        .html()
        .indexOf('click here'),
    ).not.toEqual(-1)
  })

  test('should call homeGetStarted when the Segment is clicked', () => {
    wrapper.find(Segment).simulate('click')

    expect(homeGetStarted).toHaveBeenCalledWith(ctaUri, sectionForTracking)
  })

  describe('default props', () => {
    beforeEach(() => {
      wrapper = mount(
        <CTA homeGetStarted={homeGetStarted} width={width} ctaUri={ctaUri}>
          click here
        </CTA>,
      )
    })

    test('should be centered on default', () => {
      expect(wrapper.prop('align')).toEqual('center')
    })

    test('should not be responsive on default', () => {
      expect(wrapper.prop('responsive')).toBe(false)
    })
  })
})
