import React from 'react'
import { shallow, mount } from 'enzyme'
import { renderHook, act } from '@testing-library/react-hooks'
// eslint-disable-next-line import/no-named-as-default
import { SaveButton, useSaving } from 'OrderSummary/SaveButton'

import { Button } from 'goustouicomponents'

jest.useFakeTimers('legacy')

describe('useSaving', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when saving isn\'t required', () => {
    it('should set showButton to false', () => {
      const saveRequired = false
      const saving = false
      const error = null

      const { result } = renderHook(() => useSaving(saveRequired, saving, error))

      expect(result.current.showButton).toEqual(false)
      expect(result.current.showSuccess).toEqual(false)
      expect(result.current.showError).toEqual(false)
    })
  })

  describe('when saving is required', () => {
    it('should set showButton to true', () => {
      const saveRequired = true
      const saving = false
      const error = false

      const { result } = renderHook(() => useSaving(saveRequired, saving, error))

      expect(result.current.showButton).toEqual(true)
      expect(result.current.showSuccess).toEqual(false)
      expect(result.current.showError).toEqual(false)
    })

    describe('when saving is successful', () => {
      it('should return true for showSuccess and then reset it to false', () => {
        const saveRequired = true
        let saving = true
        const error = false

        const { result, rerender, waitFor } = renderHook(() =>
          useSaving(saveRequired, saving, error)
        )

        expect(result.current.showButton).toEqual(true)
        expect(result.current.showSuccess).toEqual(false)
        expect(result.current.showError).toEqual(false)

        saving = false

        rerender()

        expect(result.current.showButton).toEqual(false)
        expect(result.current.showSuccess).toEqual(true)
        expect(result.current.showError).toEqual(false)

        expect(setTimeout).toHaveBeenCalledTimes(1)
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 5000)

        act(() => setTimeout.mock.calls[0][0]())

        waitFor(() => expect(result.current.showSuccess).toEqual(false))

        expect(result.current.showButton).toEqual(false)
        expect(result.current.showError).toEqual(false)
      })
    })

    describe('when saving errors', () => {
      it('should return true for showError and then reset it to false', () => {
        const saveRequired = true
        let saving = true
        let error = false

        const { result, rerender, waitFor } = renderHook(() =>
          useSaving(saveRequired, saving, error)
        )

        expect(result.current.showButton).toEqual(true)
        expect(result.current.showSuccess).toEqual(false)
        expect(result.current.showError).toEqual(false)

        saving = false
        error = true

        rerender()

        expect(result.current.showButton).toEqual(false)
        expect(result.current.showSuccess).toEqual(false)
        expect(result.current.showError).toEqual(true)

        expect(setTimeout).toHaveBeenCalledTimes(1)
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 5000)

        act(() => setTimeout.mock.calls[0][0]())

        waitFor(() => expect(result.current.showError).toEqual(false))

        expect(result.current.showButton).toEqual(false)
        expect(result.current.showSuccess).toEqual(false)
      })
    })
  })
})

describe('SaveButton', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should show Button if saveRequired', () => {
    const wrapper = shallow(<SaveButton saveRequired />)

    expect(wrapper.find(Button).length).toEqual(1)
  })

  test('should not show Button if not saveRequired', () => {
    const wrapper = shallow(<SaveButton saveRequired={false} />)

    expect(wrapper.type()).toEqual('div')
    expect(wrapper.find(Button).length).toEqual(0)
  })

  test('should disable Button when saving', () => {
    const wrapper = shallow(<SaveButton saving saveRequired />)

    expect(wrapper.find(Button).prop('disabled')).toEqual(true)
  })

  test('should pass pending Button when saving', () => {
    const wrapper = shallow(<SaveButton saving saveRequired />)

    expect(wrapper.find(Button).prop('pending')).toEqual(true)
  })

  test('should call onClick function when clicked', () => {
    const clickSpy = jest.fn()

    const wrapper = shallow(<SaveButton onClick={clickSpy} saveRequired />)

    wrapper.find(Button).simulate('click')

    expect(clickSpy).toHaveBeenCalledTimes(1)
  })

  test('should show button if showButton state true', () => {
    const wrapper = mount(<SaveButton saveRequired={false} />)

    expect(wrapper.find('Button').length).toEqual(0)

    act(() => {
      wrapper.setProps({ saveRequired: true })
    })
    wrapper.update()

    expect(wrapper.find('Button').length).toEqual(1)
  })

  test('should show success div if showSuccess state', () => {
    const wrapper = mount(<SaveButton saveRequired={false} saving />)

    expect(wrapper.find('div').length).toEqual(1)

    act(() => {
      wrapper.setProps({ saving: false })
    })
    wrapper.update()

    expect(wrapper.find('div').at(1).text()).toEqual('SAVED')
  })

  test('should show error div if showError state', () => {
    const wrapper = mount(<SaveButton saveRequired={false} saving />)

    expect(wrapper.find('div').length).toEqual(1)

    act(() => {
      wrapper.setProps({ error: true, saving: false })
    })
    wrapper.update()

    expect(wrapper.find('div').at(1).text()).toEqual('ERROR SAVING CHOICES')
  })

  test('should add updateOrderButton class to the wrapper when onOrderConfirmationMobile is true', () => {
    const wrapper = shallow(<SaveButton saveRequired={false} onOrderConfirmationMobile />)

    expect(wrapper.find('.updateOrderButton').length).toEqual(1)

    wrapper.setProps({ onOrderConfirmationMobile: false })

    expect(wrapper.find('.updateOrderButton').length).toEqual(0)
  })
})
