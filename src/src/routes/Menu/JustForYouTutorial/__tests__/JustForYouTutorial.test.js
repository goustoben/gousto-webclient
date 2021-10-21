import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import configureMockStore from 'redux-mock-store'
import { JustForYouTutorial } from '../JustForYouTutorial'
import { JustForYouTutorialContainer } from '../JustForYouTutorialContainer'

describe('JustForYouTutorial Component', () => {
  const incrementTutorialViewed = jest.fn()
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <JustForYouTutorial
        showTutorial
        incrementTutorialViewed={incrementTutorialViewed}
        collectionName="Just For You"
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
    wrapper = shallow(<JustForYouTutorial showTutorial={false} incrementTutorialViewed={incrementTutorialViewed} />)

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
  let wrapper
  it('should not render JFY if browser Edge', () => {
    const mockStore = configureMockStore()
    const store = mockStore({
      tutorial: Immutable.fromJS({
        visible: {
          justforyou: true,
        }
      }),
      menuCollections: Immutable.fromJS({
        recommendationID: {
          slug: 'recommendations',
          shortTitle: 'Chosen For You'
        }
      }),
      request: Immutable.fromJS({
        userAgent: 'Edge'
      })
    })

    wrapper = shallow(
      <JustForYouTutorialContainer store={store} />
    )

    expect(wrapper.find('JustForYouTutorial').prop('showTutorial')).toBe(false)
  })

  it('should not render JFY if browser IE', () => {
    const mockStore = configureMockStore()
    const store = mockStore({
      tutorial: Immutable.fromJS({
        visible: {
          justforyou: true,
        }
      }),
      menuCollections: Immutable.fromJS({
        recommendationID: {
          slug: 'recommendations',
          shortTitle: 'Chosen For You'
        }
      }),
      request: Immutable.fromJS({
        userAgent: 'Trident'
      })
    })

    wrapper = shallow(
      <JustForYouTutorialContainer store={store} />
    )
    expect(wrapper.find('JustForYouTutorial').prop('showTutorial')).toBe(false)
  })

  it('should not render JFY if browser Chrome but justforyou not present', () => {
    const mockStore = configureMockStore()
    const store = mockStore({
      tutorial: Immutable.fromJS({
        visible: {
          justforyou: false,
        }
      }),
      menuCollections: Immutable.fromJS({
        recommendationID: {
          slug: 'recommendations',
          shortTitle: 'Chosen For You'
        }
      }),
      request: Immutable.fromJS({
        userAgent: 'Chrome'
      }
      )})

    wrapper = shallow(
      <JustForYouTutorialContainer store={store} />
    )
    expect(wrapper.find('JustForYouTutorial').prop('showTutorial')).toBe(false)
  })

  it('should render JFY if browser Chrome', () => {
    const mockStore = configureMockStore()
    const store = mockStore({
      tutorial: Immutable.fromJS({
        visible: {
          justforyou: true,
        }
      }),
      menuCollections: Immutable.fromJS({
        recommendationID: {
          slug: 'recommendations',
          shortTitle: 'Chosen For You'
        }
      }),
      request: Immutable.fromJS({
        userAgent: 'Chrome'
      }
      )})

    wrapper = shallow(
      <JustForYouTutorialContainer store={store} />
    )
    expect(wrapper.find('JustForYouTutorial').prop('showTutorial')).toBe(true)
  })
})
