import sinon from 'sinon'
import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { createCtaContainer } from 'utils/createCtaContainer'
import { Button } from 'goustouicomponents'
import Link from 'Link'

describe('createCtaContainer', () => {
  let ConnectContainer
  let wrapper

  const mockStore = configureMockStore()
  const store = mockStore({})

  test('should return connected Button by default', () => {
    ConnectContainer = createCtaContainer()

    wrapper = shallow(<ConnectContainer store={store} />)

    expect(wrapper.find(Button)).toBeDefined()
  })

  test('should return connected Link if type is "Link"', () => {
    ConnectContainer = createCtaContainer({ type: 'Link' })

    wrapper = shallow(<ConnectContainer store={store} />)

    expect(wrapper.find(Link)).toBeDefined()
  })

  test('should map children to text by default', () => {
    ConnectContainer = createCtaContainer({ text: 'Sample Text' })

    wrapper = shallow(<ConnectContainer store={store} />)

    expect(wrapper.find(Button).prop('children')).toEqual('Sample Text')
  })

  test('should map children to passed in prop "text" if set', () => {
    ConnectContainer = createCtaContainer({ text: 'Sample Text' })

    wrapper = shallow(<ConnectContainer store={store} text="Override Text" />)

    expect(wrapper.find(Button).prop('children')).toEqual('Override Text')
  })

  test('should map onClick to passed in action', () => {
    const actionSpy = sinon.spy()
    ConnectContainer = createCtaContainer({ action: actionSpy })

    wrapper = shallow(<ConnectContainer store={store} />)

    wrapper.find(Button).simulate('click')

    expect(actionSpy.callCount).toEqual(1)
  })
})
