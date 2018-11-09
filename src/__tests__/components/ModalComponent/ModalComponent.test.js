import React from 'react'
import { shallow } from 'enzyme'

import ModalComponent from 'ModalComponent'
import Overlay from 'Overlay'

describe('ModalComponent', () => {
  let wrapper

  test('should render a <Overlay>', () => {
    wrapper = shallow(<ModalComponent />)

    expect(wrapper.type()).toBe(Overlay)
  })

  test('should render children', () => {
    wrapper = shallow(
			<ModalComponent>
				<p>Child</p>
			</ModalComponent>,
    )
    // first childredn is the div rendered by the ModalComponent
    const firstChildWrapper = wrapper.children().children()

    expect(firstChildWrapper.type()).toEqual('p')
    expect(firstChildWrapper.prop('children')).toEqual('Child')
  })
})
