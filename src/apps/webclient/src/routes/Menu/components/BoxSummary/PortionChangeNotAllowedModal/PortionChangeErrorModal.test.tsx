import { Modal } from 'goustouicomponents'
import { shallow } from 'enzyme'
import React from 'react'
import { PortionChangeErrorModal } from './PortionChangeErrorModal'

describe('PortionChangeErrorModal', () => {
  const onClickHandler = jest.fn()
  const maxRecipesForPortion = 4

  test('should show modal if shouldShow is true', () => {
    const wrapper = shallow(
      <PortionChangeErrorModal
        shouldShow
        maxRecipesForPortion={maxRecipesForPortion}
        onClose={onClickHandler}
      />,
    )

    expect(wrapper.find(Modal).prop('isOpen')).toEqual(true)
  })

  test('CTA should call onClose handler', () => {
    const wrapper = shallow(
      <PortionChangeErrorModal
        shouldShow
        maxRecipesForPortion={maxRecipesForPortion}
        onClose={onClickHandler}
      />,
    )

    wrapper.find('CTA').simulate('click')
    expect(onClickHandler).toHaveBeenCalledTimes(1)
  })
})
