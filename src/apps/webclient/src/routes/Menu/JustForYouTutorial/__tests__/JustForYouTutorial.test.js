import React from 'react'
import { shallow } from 'enzyme'
import * as TutorialActions from 'actions/tutorial'
import * as useShowJFYTutorial from '../useShowJFYTutorial'
import { JustForYouTutorial } from '../JustForYouTutorial'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn().mockImplementation(() => jest.fn()),
  useSelector: jest.fn(),
}))

describe('JustForYouTutorial Component', () => {
  const incrementTutorialViewed = jest.fn()
  let wrapper

  beforeEach(() => {
    jest.spyOn(useShowJFYTutorial, 'useShowJFYTutorial')
      .mockImplementation(() => true)

    jest.spyOn(TutorialActions, 'incrementTutorialViewed')
      .mockImplementation(incrementTutorialViewed)

    wrapper = shallow(<JustForYouTutorial />)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render if showTutorial is true', () => {
    expect(wrapper.find('Portal').length).toEqual(1)
  })

  it('should not render if showTutorial is false', () => {
    jest.spyOn(useShowJFYTutorial, 'useShowJFYTutorial')
      .mockImplementationOnce(() => false)

    wrapper = shallow(<JustForYouTutorial />)

    expect(wrapper.find('Portal').length).toEqual(0)
  })

  it('should render Tutorial component', () => {
    expect(wrapper.find('Tutorial').length).toEqual(1)
  })

  it('should render 2 Step components', () => {
    expect(wrapper.find('Step').length).toEqual(2)
  })

  it('should render first Step component with 3 children', () => {
    expect(wrapper.find('Step').at(0).children().length).toEqual(3)
  })

  it('should render second Step component with 1 child', () => {
    expect(wrapper.find('Step').at(1).children().length).toEqual(1)
  })

  it('should call incrementTutorialViewed prop when Tutorial onClose is invoked', () => {
    const onClose = wrapper.find('Tutorial').prop('onClose')

    onClose()

    expect(incrementTutorialViewed).toHaveBeenCalled()
  })
})
