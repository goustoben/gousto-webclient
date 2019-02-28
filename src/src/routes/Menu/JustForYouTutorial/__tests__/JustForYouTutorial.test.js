import React from 'react'
import { shallow } from 'enzyme'

import { JustForYouTutorial } from '../JustForYouTutorial'

describe('JustForYouTutorial Component', () => {
  const mockClose = jest.fn()
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<JustForYouTutorial showTutorial tutorialViewed={false} incrementTutorialViewed={mockClose}/>)
  })

  it('should render if showTutorial is true and tutorialViewed is false', () => {
    expect(wrapper.find('Portal').length).toEqual(1)
  })
  it('should not render if showTutorial is false', () => {
    wrapper = shallow(<JustForYouTutorial showTutorial={false} tutorialViewed={false} incrementTutorialViewed={mockClose}/>)
    expect(wrapper.find('Portal').length).toEqual(0)
  })
  it('tutorialViewed is true', () => {
    wrapper = shallow(<JustForYouTutorial showTutorial tutorialViewed incrementTutorialViewed={mockClose}/>)
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

  it('should call incrementTutorialViewed function when onClose is called', () => {
    const onClose = wrapper.find('Tutorial').prop('onClose')
    onClose()
    expect(mockClose).toHaveBeenCalled()
  })
})
