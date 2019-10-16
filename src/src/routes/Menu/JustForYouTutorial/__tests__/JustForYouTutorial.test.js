import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { JustForYouTutorial } from '../JustForYouTutorial'
import { JustForYouTutorial as JustForYouTutorialComponent } from '..'

describe('JustForYouTutorial Component', () => {
  const incrementTutorialViewed = jest.fn()
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <JustForYouTutorial
        showTutorial
        incrementTutorialViewed={incrementTutorialViewed}
        collectionName={'Just For You'}
      />
    )
  })

  afterEach(() => {
    incrementTutorialViewed.mockClear()
  })

  it('should render if showTutorial is true', () => {
    expect(wrapper.find('Portal').length).toEqual(1)
  })

  it('should not render if showTutorial is false', () => {
    wrapper = shallow(<JustForYouTutorial showTutorial={false} incrementTutorialViewed={incrementTutorialViewed}/>)

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

describe('Check browser to show JFY', () => {
  let getState
  let wrapper
  it('should not render JFY if browser Edge', () => {
    getState = () => ({
      tutorial: Immutable.fromJS({
        visible: {
          justforyou: true,
        }
      }),
      menuCollections: Immutable.fromJS({
        'recommendationID': {
          slug: 'recommendations',
          shortTitle: 'Chosen For You'
        }
      }),
      request: Immutable.fromJS({
        userAgent: 'Edge'
      }
      )})

    wrapper = shallow(
        <JustForYouTutorialComponent />, {
          context: {
            store: {
              getState,
              subscribe: jest.fn()
            },
          }
        }
    )
    expect(wrapper.instance().selector.props.showTutorial).toBe(false)
  })

  it('should not render JFY if browser IE', () => {
    getState = () => ({
      tutorial: Immutable.fromJS({
        visible: {
          justforyou: true,
        }
      }),
      menuCollections: Immutable.fromJS({
        'recommendationID': {
          slug: 'recommendations',
          shortTitle: 'Chosen For You'
        }
      }),
      request: Immutable.fromJS({
        userAgent: 'Trident'
      }
      )})

    wrapper = shallow(
        <JustForYouTutorialComponent />, {
          context: {
            store: {
              getState,
              subscribe: jest.fn()
            },
          }
        }
    )

    expect(wrapper.instance().selector.props.showTutorial).toBe(false)
  })

  it('should not render JFY if browser Chrome but justforyou not present', () => {
    getState = () => ({
      tutorial: Immutable.fromJS({
        visible: {
          justforyou: false,
        }
      }),
      menuCollections: Immutable.fromJS({
        'recommendationID': {
          slug: 'recommendations',
          shortTitle: 'Chosen For You'
        }
      }),
      request: Immutable.fromJS({
        userAgent: 'Chrome'
      }
      )})

    wrapper = shallow(
        <JustForYouTutorialComponent />, {
          context: {
            store: {
              getState,
              subscribe: jest.fn()
            },
          }
        }
    )
    expect(wrapper.instance().selector.props.showTutorial).toBe(false)
  })

  it('should render JFY if browser Chrome', () => {
    getState = () => ({
      tutorial: Immutable.fromJS({
        visible: {
          justforyou: true,
        }
      }),
      menuCollections: Immutable.fromJS({
        'recommendationID': {
          slug: 'recommendations',
          shortTitle: 'Chosen For You'
        }
      }),
      request: Immutable.fromJS({
        userAgent: 'Chrome'
      }
      )})

    wrapper = shallow(
        <JustForYouTutorialComponent />, {
          context: {
            store: {
              getState,
              subscribe: jest.fn()
            },
          }
        }
    )
    expect(wrapper.instance().selector.props.showTutorial).toBe(true)
  })
})
