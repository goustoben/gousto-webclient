import React from 'react'

import { shallow } from 'enzyme'

import * as TutorialActions from 'actions/tutorial'

import { LikeDislikeTutorial } from './LikeDislikeTutorial'
import * as useShowLikeDislikeTutorial from './useShowLikeDislikeTutorial'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn().mockImplementation(() => jest.fn()),
  useSelector: jest.fn(),
}))

describe('LikeDislikeTutorial Component', () => {
  const incrementTutorialViewed = jest.fn()
  let wrapper

  beforeEach(() => {
    jest
      .spyOn(useShowLikeDislikeTutorial, 'useShowLikeDislikeTutorial')
      .mockImplementation(() => true)

    jest
      .spyOn(TutorialActions, 'incrementTutorialViewed')
      .mockImplementation(incrementTutorialViewed)

    wrapper = shallow(<LikeDislikeTutorial />)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render if showTutorial is true', () => {
    expect(wrapper.find('Portal').length).toEqual(1)
  })

  it('should not render if showTutorial is false', () => {
    jest
      .spyOn(useShowLikeDislikeTutorial, 'useShowLikeDislikeTutorial')
      .mockImplementationOnce(() => false)

    wrapper = shallow(<LikeDislikeTutorial />)

    expect(wrapper.find('Portal').length).toEqual(0)
  })

  it('should render Tutorial component', () => {
    expect(wrapper.find('Tutorial').length).toEqual(1)
  })

  it('should render 1 Step component', () => {
    expect(wrapper.find('Step').length).toEqual(1)
  })

  it('should render first Step component with 4 children', () => {
    expect(wrapper.find('Step').at(0).children().length).toEqual(4)
  })

  it('should call incrementTutorialViewed prop when Tutorial onClose is invoked', () => {
    const onClose = wrapper.find('Tutorial').prop('onClose')

    onClose()

    expect(incrementTutorialViewed).toHaveBeenCalled()
  })
})
