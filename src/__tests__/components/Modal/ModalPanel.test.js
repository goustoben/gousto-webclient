import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'

import ModalPanel from 'components/Modal/ModalPanel'

describe('ModalPanel', () => {
  let wrapper

  test('should render a <div>', () => {
    wrapper = shallow(<ModalPanel />)

    expect(wrapper.type()).toEqual('div')
  })

  test('should render a <div> with onClick equal to onGoBack and with one <span> & text "Back" if onGoBack is provided', () => {
    const onGoBack = sinon.spy()

    wrapper = shallow(<ModalPanel onGoBack={onGoBack} />)
    const backButtonWrapper = wrapper.find('div > div > div').at(0)

    expect(backButtonWrapper.type()).toEqual('div')
    expect(backButtonWrapper.prop('onClick')).toEqual(onGoBack)
    expect(backButtonWrapper.find('span').length).toEqual(1)
    expect(backButtonWrapper.text()).toEqual(' Back')
  })

  test('should render a <div> with onClick equal to closePortalFromButton with one <span> if closePortalFromButton is provided', () => {
    const closePortalFromButton = sinon.spy()

    wrapper = shallow(
			<ModalPanel closePortalFromButton={closePortalFromButton} />,
    )
    const closeButtonWrapper = wrapper.find('div > div > div').at(0)

    expect(closeButtonWrapper.type()).toEqual('div')
    expect(closeButtonWrapper.prop('onClick')).toEqual(closePortalFromButton)
    expect(closeButtonWrapper.find('span').length).toEqual(1)
  })

  test('should render a <div> with onClick equal to closePortal and with one <span> if closePortal is provided', () => {
    const closePortal = sinon.spy()

    wrapper = shallow(<ModalPanel closePortal={closePortal} />)
    const closeButtonWrapper = wrapper.find('div > div > div').at(0)

    expect(closeButtonWrapper.type()).toEqual('div')
    expect(closeButtonWrapper.prop('onClick')).toEqual(closePortal)
    expect(closeButtonWrapper.find('span').length).toEqual(1)
  })

  test('should render children', () => {
    const children = (
			<div>
				<span>Child node</span>
			</div>
    )

    wrapper = shallow(<ModalPanel>{children}</ModalPanel>)

    expect(wrapper.contains(children)).toEqual(true)
  })
})
