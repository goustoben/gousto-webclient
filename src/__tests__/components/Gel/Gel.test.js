import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

import Gel from 'Gel'
import css from 'Gel/Gel.css'

describe('<Gel />', () => {
  let wrapper

  test('should render by default', () => {
    wrapper = shallow(<Gel />)

    expect(wrapper.find('div').length).toBeGreaterThanOrEqual(1)
  })

  test("should render it's children", () => {
    const TestComponent = () => (
			<div>
				<p>A Test Component</p>
			</div>
    )
    wrapper = shallow(
			<Gel>
				<TestComponent />
			</Gel>,
    )

    expect(wrapper.find(TestComponent).length).toBe(1)
  })

  test("should add a class with it's size prop", () => {
    const size = 'medium'
    wrapper = shallow(<Gel size={size} />)

    expect(
      wrapper
        .find('div')
        .first()
        .hasClass(css[size]),
    ).toBe(true)
  })

  describe('snapshots', () => {
    test('should render children', () => {
      const tree = renderer
        .create(
					<Gel>
						<h1>A Gel's child</h1>
					</Gel>,
        )
        .toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
