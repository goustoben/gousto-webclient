import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { useSelector } from 'react-redux'
import { MOBILE_VIEW, DESKTOP_VIEW } from 'utils/view'
import { ExpandBoxSummaryButton, Contents } from '../ExpandBoxSummaryButton'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

const mockedUseSelector = useSelector as jest.MockedFunction<typeof useSelector>

const render = () =>
  shallow(
    <ExpandBoxSummaryButton
      showDetails={false}
      pricingPending={false}
      numPortions={4}
      numRecipes={2}
      date="2022-03-09"
      slotId="test-slot-id"
      warning={false}
      onClick={jest.fn()}
      view={MOBILE_VIEW}
    />,
  )

describe('given ExpandBoxSummaryButton is rendered', () => {
  let wrapper: ShallowWrapper<any, any>

  beforeEach(() => {
    wrapper = render()
  })

  test('then it should render Contents directly', () => {
    expect(wrapper.find('Button')).toHaveLength(0)
    expect(wrapper.find('Contents')).toHaveLength(1)
  })

  describe('and when view is Desktop', () => {
    beforeEach(() => {
      wrapper.setProps({
        view: DESKTOP_VIEW,
      })
    })

    test('then it should render Contents through the Button', () => {
      expect(wrapper.find('Button')).toHaveLength(1)
      expect(wrapper.find('Contents')).toHaveLength(1)
    })
  })
})

describe('given ExpandBoxSummaryButton Contents is rendered', () => {
  let wrapper: ShallowWrapper<any, any>

  beforeEach(() => {
    wrapper = shallow(
      <Contents
        numPortions={4}
        numRecipes={2}
        date="2022-03-09"
        slotId="test-slot-id"
        warning={false}
      />,
    )
  })

  test('then it should render correctly', () => {
    expect(wrapper.hasClass('buttonTextWrapper')).toBe(true)
    expect(wrapper.find('.badge')).toHaveLength(0)
    expect(wrapper.find('Title')).toHaveLength(1)
    expect(wrapper.find('Description')).toHaveLength(1)
  })
})
