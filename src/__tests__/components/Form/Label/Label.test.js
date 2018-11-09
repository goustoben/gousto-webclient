import React from 'react'

import sinon from 'sinon'

import { shallow } from 'enzyme'
import Label from 'Form/Label'

describe('Label', () => {
  let wrapper

  test('should return a <label> tag', () => {
    wrapper = shallow(<Label />)
    expect(wrapper.type()).toEqual('label')
  })

  test('should show the label, sublabel and children props', () => {
    wrapper = shallow(
			<Label label="my label" subLabel="my subLabel">
				Input...
			</Label>,
    )

    const text = wrapper.text()
    expect(text).toContain('my label')
    expect(text).toContain('my subLabel')
    expect(text).toContain('Input...')
  })
})
