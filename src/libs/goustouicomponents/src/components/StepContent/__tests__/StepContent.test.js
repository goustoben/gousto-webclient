import React from 'react'
import { mount } from 'enzyme'
import { StepContent } from '..'

describe('<StepContent />', () => {
  let wrapper
  const casesStyle = [
    [1, 3, '0'],
    [2, 3, '-100%'],
    [3, 3, '-200%'],
  ]

  beforeAll(() => {
    wrapper = mount(
      <StepContent step={1} size={3}>
        <div>
          Child 1
        </div>
        <div>
          Child 2
        </div>
        <div>
          Child 3
        </div>
      </StepContent>,
    )
  })

  test('renders the children correctly', () => {
    expect(wrapper.find('.animation').children().length).toBe(3)
  })

  describe.each(casesStyle)('when setting the styling for the carousel', (step, size, expectedMargin) => {
    beforeEach(() => {
      wrapper = mount(
        <StepContent step={step} size={size}>
          <div>
            Child 1
          </div>
          <div>
            Child 2
          </div>
          <div>
            Child 3
          </div>
        </StepContent>,
      )
    })

    test(`then marginLeft is set to ${expectedMargin}`, () => {
      expect(wrapper.find('.animation').prop('style').marginLeft).toBe(expectedMargin)
    })

    test(`and width is set to ${size + 1}00%`, () => {
      expect(wrapper.find('.animation').prop('style').width).toBe('300%')
    })
  })
})
