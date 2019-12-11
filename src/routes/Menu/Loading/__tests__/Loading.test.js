import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import Loading from '../Loading'

describe('Menu Loading', () => {
  let wrapper

  describe('Initial Rendering', () => {
    test('should match snapshot', () => {
      const tree = renderer.create(<Loading loading hasRecommendations />).toJSON()
      expect(tree).toMatchSnapshot()
    })

  })

  describe('Alternative Rendering', () => {
    test('should not render anything if loading is null', () => {
      wrapper = shallow(<Loading />)

      expect(wrapper.type()).toBe(null)
    })

    test('should render loading component if hasRecommendations is false', () => {
      wrapper = shallow(<Loading loading />)
      const loadingComponent = wrapper.find('[className="loading"]')

      expect(loadingComponent).toHaveLength(1)
    })
  })
})
